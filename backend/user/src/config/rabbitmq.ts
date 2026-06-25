import amqp from "amqplib"

let channel : amqp.Channel

export const connectRabbitMQ = async()=>{
    try {
        const connection = await amqp.connect({
            protocol:"amqp",
            hostname:process.env.Rabbitmq_Host as string,
            port:5672,
            username:process.env.Rabbitmq_Username as string,
            password:process.env.Rabbitmq_Password as string,
        })

        channel = await connection.createChannel()

        console.log("connected to rabbitmq")
    } catch (error) {
        console.log("rabbitMq is not connectes",error)
    }
}