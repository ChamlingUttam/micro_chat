import "dotenv/config"
import express from "express"
import { startSendOtpConsumer } from "./consumer"

startSendOtpConsumer()
const app = express()

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`mail service is running at ${PORT}`)
})