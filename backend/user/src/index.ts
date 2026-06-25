import "dotenv/config"
import express from "express"
import connectDb from "./config/db"
import { createClient } from "redis"
import userRoute from "./routes/user.routes"
import { connectRabbitMQ } from "./config/rabbitmq"

const app = express()


app.use("api/v1",userRoute)
const PORT = process.env.PORT


export const redisCLient = createClient({
    url: process.env.REDIS_URL as string,
})

redisCLient.connect().then(()=>console.log("redis connected")).catch(console.error)

connectDb()
connectRabbitMQ()
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
