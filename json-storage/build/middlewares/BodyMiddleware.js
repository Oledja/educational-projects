"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const bodyValidator = (req, res, next) => {
    try {
        let { body: data } = req;
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
                req.body = JSON.stringify(data);
            }
            catch (err) {
                throw new Error("Json is incorrect");
            }
        }
        req.body = JSON.stringify(data);
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ Error: err.message });
        }
    }
};
exports.bodyValidator = bodyValidator;
