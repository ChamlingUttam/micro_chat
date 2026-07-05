"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAUser = exports.getAllUser = exports.updateName = exports.myProfile = exports.verifyUser = exports.loginUser = void 0;
const index_1 = require("../index");
const tryCatch_1 = require("../config/tryCatch");
const rabbitmq_1 = require("../config/rabbitmq");
const User_1 = require("../model/User");
const generateToken_1 = require("../config/generateToken");
exports.loginUser = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `otp:ratelimit:${email}`;
    const rateLimit = await index_1.redisCLient.get(rateLimitKey);
    if (rateLimit) {
        res.status(429).json({ message: "too many request. please wait before requesting new otp" });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;
    await index_1.redisCLient.set(otpKey, otp, {
        EX: 300,
    });
    await index_1.redisCLient.set(rateLimitKey, "true", {
        EX: 60,
    });
    const message = {
        to: email,
        subject: "your otp code",
        body: `your OTP is ${otp}. it is valid for 5 minutes`
    };
    await (0, rabbitmq_1.publishTOQueue)("sent-otp", message);
    res.status(200).json({ message: "OTP send to your mail" });
});
exports.verifyUser = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const { email, otp: enteredOtp } = req.body;
    if (!email || !enteredOtp) {
        res.status(400).json({ message: "email or OTP requires" });
        return;
    }
    const otpKey = `otp:${email}`;
    const storedOtp = await index_1.redisCLient.get(otpKey);
    if (!storedOtp || storedOtp !== enteredOtp) {
        res.status(400).json({
            message: "invalid or expired otp"
        });
        return;
    }
    await index_1.redisCLient.del(otpKey);
    let user = await User_1.User.findOne({ email });
    if (!user) {
        const name = email.slice(0, 8);
        user = await User_1.User.create({ name, email });
    }
    const token = (0, generateToken_1.generateToken)(user);
    res.json({
        message: "user verified",
        user,
        token
    });
});
exports.myProfile = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const user = req.user;
    res.json(user);
});
exports.updateName = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const user = await User_1.User.findById(req.user?._id);
    if (!user) {
        res.status(401).json({
            message: "please login"
        });
        return;
    }
    user.name = req.body.name;
    await user.save();
    const token = (0, generateToken_1.generateToken)(user);
    res.json({
        message: "user name updated",
        user,
        token,
    });
});
exports.getAllUser = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const users = await User_1.User.find();
    res.json(users);
});
exports.getAUser = (0, tryCatch_1.TryCatch)(async (req, res) => {
    const { id } = req.params;
    const user = await User_1.User.findById(id);
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.json(user);
});
//# sourceMappingURL=user.controller.js.map