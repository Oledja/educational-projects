"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonRepository_1 = __importDefault(require("../repositories/jsonRepository"));
class Model {
    getJson(route) {
        return jsonRepository_1.default.findOne({ route: route })
            .exec()
            .then((json) => {
            if (json) {
                return {
                    route: json.route,
                    data: json.data
                };
            }
            else {
                throw new Error(`Json with route ${route} does't exist`);
            }
        })
            .catch(err => {
            throw new Error(err);
        });
    }
    addJson(route, data) {
        return jsonRepository_1.default.findOneAndDelete({ route: route })
            .then(() => {
            const newJson = new jsonRepository_1.default({
                route: route,
                data: data
            });
            return newJson.save();
        })
            .catch((err) => {
            throw new Error(err);
        });
    }
}
exports.default = Model;
