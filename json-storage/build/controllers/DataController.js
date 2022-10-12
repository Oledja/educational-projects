"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataModel_1 = __importDefault(require("../models/DataModel"));
class DataController {
    saveData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: data, url: route } = req;
                const routeExist = yield DataModel_1.default.findOne({
                    route,
                });
                if (routeExist) {
                    throw new Error(`Sorry, route: ${routeExist.route} already exists`);
                }
                yield new DataModel_1.default({ route, data }).save();
                res.status(200).json("Data saved successfully");
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(400).json(err.message);
            }
        });
    }
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url: route } = req;
                const result = yield DataModel_1.default.findOne({ route });
                if (!result) {
                    throw new Error(`No data for route: ${route}`);
                }
                res.status(200).json(JSON.parse(result.data));
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(400).json(err.message);
            }
        });
    }
}
exports.default = new DataController();
//# sourceMappingURL=DataController.js.map