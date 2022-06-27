"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonRoutes_1 = require("./routes/jsonRoutes");
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
app.set("view engine", "hbs");
app.set('views', "C:\\Users\\12345\\Desktop\\lambda-tasks\\json-storage\\src\\views");
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(jsonRoutes_1.router);
app.listen(config_1.default.server.port, () => {
    console.log(`Example app listening on port ${config_1.default.server.port}`);
});
