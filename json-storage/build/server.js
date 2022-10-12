"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const DataRoutes_1 = require("./routes/DataRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DB_URL);
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(DataRoutes_1.router);
app.listen(4000, () => {
    console.log(`Example app listening on port 4000`);
});
//# sourceMappingURL=server.js.map