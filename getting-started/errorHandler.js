"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler() {
    return {
        onError: (handler) => {
            const { error } = handler;
            handler.response = {
                statusCode: 400,
                body: JSON.stringify(error.message),
            };
            return Promise.resolve();
        },
    };
}
exports.errorHandler = errorHandler;
