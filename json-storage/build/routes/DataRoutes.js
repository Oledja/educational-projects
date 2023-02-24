"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const DataController_1 = __importDefault(require("../controllers/DataController"));
const BodyMiddleware_1 = require("../middlewares/BodyMiddleware");
const router = (0, express_1.Router)();
exports.router = router;
const dataController = new DataController_1.default();
router.get("/:route", dataController.getData);
router.post("/:route", BodyMiddleware_1.bodyValidator, dataController.saveData);
