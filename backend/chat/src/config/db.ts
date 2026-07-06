import mongoose from "mongoose";

const connectDb = async()=>{
     const url = process.env.MONGO_URI

     if(!url){
        throw new Error("MONGO_URI is not define in .env")
     }

     try {
        await mongoose.connect(url,{
            dbName:"microserviceChatApp"
        })

        console.log("db connected")
     } catch (error) {
        console.error("failed to db connection",error)
        process.exit(1)
        
     }
}

export default connectDb