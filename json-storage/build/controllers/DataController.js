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
const DataService_1 = __importDefault(require("../services/DataService"));
const getErrorMessage_1 = __importDefault(require("../utils/getErrorMessage"));
class DataController {
    constructor() {
        this.dataService = new DataService_1.default();
        this.saveData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: data, url: route } = req;
                yield this.dataService.saveData(route, data);
                res.status(200).json("Data saved successfully");
            }
            catch (err) {
                res.status(500).json((0, getErrorMessage_1.default)(err));
            }
        });
        this.getData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { url: route } = req;
                const response = yield this.dataService.getData(route);
                if (response) {
                    response;
                    res.status(200).json(JSON.parse(response.data));
                }
                else
                    throw new Error(`Тo saved data for the route: ${route}`);
            }
            catch (err) {
                if (err instanceof Error)
                    res.status(400).json(err.message);
            }
        });
    }
}
exports.default = DataController;
