"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const BodyMiddleware_1 = require("../middlewares/BodyMiddleware");
const DataController_1 = __importDefault(require("../controllers/DataController"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/:route", DataController_1.default.getData);
router.post("/:route", BodyMiddleware_1.bodyValidator, DataController_1.default.saveData);
//# sourceMappingURL=DataRoutes.js.map