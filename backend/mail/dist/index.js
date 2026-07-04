"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const consumer_1 = require("./consumer");
(0, consumer_1.startSendOtpConsumer)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`mail service is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map