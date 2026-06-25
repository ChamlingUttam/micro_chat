"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCLient = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const redis_1 = require("redis");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const rabbitmq_1 = require("./config/rabbitmq");
const app = (0, express_1.default)();
app.use("api/v1", user_routes_1.default);
const PORT = process.env.PORT;
exports.redisCLient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
exports.redisCLient.connect().then(() => console.log("redis connected")).catch(console.error);
(0, db_1.default)();
(0, rabbitmq_1.connectRabbitMQ)();
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map