"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonValidator = void 0;
function jsonValidator(req, res, next) {
    try {
        let json = req.body;
        if (typeof json === "string") {
            try {
                json = JSON.parse(JSON.stringify(json));
                req.body = JSON.parse(json);
            }
            catch (err) {
                throw new Error("Json is incorrect");
            }
        }
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ Error: err.message });
        }
    }
}
exports.jsonValidator = jsonValidator;
