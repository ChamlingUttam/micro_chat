"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSendOtpConsumer = void 0;
require("dotenv/config");
const amqplib_1 = __importDefault(require("amqplib"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const startSendOtpConsumer = async () => {
    try {
        const connection = await amqplib_1.default.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
        });
        const channel = await connection.createChannel();
        const queueName = "sent-otp";
        await channel.assertQueue(queueName, { durable: true });
        console.log("mail service started at port 5001");
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const { to, subject, body } = JSON.parse(msg.content.toString());
                    const transporter = nodemailer_1.default.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASSWORD,
                        },
                    });
                    await transporter.sendMail({
                        from: "chat app",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`otp send to ${to}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.log("failed to send otp", error);
                }
            }
        });
    }
    catch (error) {
        console.log("failed to start rabbitMq consumer", error);
    }
};
exports.startSendOtpConsumer = startSendOtpConsumer;
//# sourceMappingURL=consumer.js.map