import "dotenv/config"
import express from "express"
import connectDb from "./config/db"

const app = express()

const PORT = process.env.PORT

connectDb()
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
