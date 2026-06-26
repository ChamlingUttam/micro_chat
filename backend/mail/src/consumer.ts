import "dotenv/config"
import amqp from "amqplib"
import nodemailer from "nodemailer"
import { duplexPair } from "nodemailer/lib/xoauth2"

export const startSendOtpConsumer = async()=>{
    try {

        const connection = await amqp.connect({
            protocol:"amqp",
            hostname:process.env.Rabbitmq_Host as string,
            port:5672,
            username:process.env.Rabbitmq_Username as string,
            password:process.env.Rabbitmq_Password as string,

        })

        const channel = await connection.createChannel()

        const queueName = "sent-otp"

        await channel.assertQueue(queueName,{durable:true})

        console.log("mail service started at port 5001")

        channel.consume(queueName,async(msg)=>{
            if(msg){
                try {
                    const {to,subject,body} = JSON.parse(msg.content.toString())

                    const transporter = nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:465,
                        auth:{
                            user: process.env.User,
                            pass: process.env.Password,
                        },
                    })
                        await transporter.sendMail({
                            from:"chat app",
                            to,
                            subject,
                            text:body,

                        })
                        console.log(`otp send to ${to}`)
                        channel.ack(msg)
                } catch (error) {
                    
                    console.log("failed to send otp",error)
                }
            }

        })
        
    } catch (error) {
        console.log("failed to start rabbitMq consumer",error)
    }
}

export const 