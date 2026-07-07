import "dotenv/config"
import express from "express"
import connectDb from "./config/db"
import chatRouter from "./routes/chat.route"

const app = express()

app.use(express.json())
app.use("/api/v1",chatRouter)
const PORT = process.env.PORT

connectDb()
app.listen(PORT,()=>{
    console.log(`chat service is running at ${PORT}`)
})