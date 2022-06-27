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
exports.addJson = exports.getJson = exports.homePage = void 0;
const jsonModel_1 = __importDefault(require("../models/jsonModel"));
const model = new jsonModel_1.default();
function homePage(req, res) {
    res.render("index");
}
exports.homePage = homePage;
const getJson = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const route = req.params.route;
            const json = yield model.getJson(route);
            if (json) {
                res.render("jsonView", { data: JSON.stringify(json.data) });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ Error: err.message });
            }
        }
    });
};
exports.getJson = getJson;
const addJson = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const route = req.params.route;
            const json = yield model.addJson(route, data);
            if (json) {
                res.status(200).json({ message: "json saved successfully" });
            }
            else {
                throw new Error("json not saved");
            }
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ Error: err.message });
            }
        }
    });
};
exports.addJson = addJson;
