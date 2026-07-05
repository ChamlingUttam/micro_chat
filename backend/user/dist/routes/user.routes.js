"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
router.post('/login', user_controller_1.loginUser);
router.post('/verify', user_controller_1.verifyUser);
router.get('/me', isAuth_1.isAuth, user_controller_1.myProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map