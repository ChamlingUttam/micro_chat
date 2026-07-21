import "dotenv/config"
import express from "express"
import connectDb from "./config/db"
import chatRouter from "./routes/chat.route"
import cors from "cors"
import { app, server } from "./config/socket"



app.use(express.json())
app.use(cors())
app.use("/api/v1",chatRouter)
const PORT = process.env.PORT

connectDb()
server.listen(PORT,()=>{
    console.log(`chat service is running at ${PORT}`)
})