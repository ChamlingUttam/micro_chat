"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = void 0;
const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
};
exports.TryCatch = TryCatch;
//# sourceMappingURL=tryCatch.js.map