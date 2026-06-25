import "dotenv/config"
import express from "express"
import connectDb from "./config/db"
import { createClient } from "redis"

const app = express()

const PORT = process.env.PORT


export const redisCLient = createClient({
    url: process.env.REDIS_URL as string,
})

redisCLient.connect().then(()=>console.log("redis connected")).catch(console.error)

connectDb()
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
