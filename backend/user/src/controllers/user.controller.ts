
import { redisCLient } from "../index";
import { TryCatch } from "../config/tryCatch";
import { publishTOQueue } from "../config/rabbitmq";

export const loginUser = TryCatch(async(req,res)=>{
    const {email} = req.body

    const rateLimitKey = `otp:ratelimit:${email}`
    const rateLimit = await redisCLient.get(rateLimitKey)

    if(rateLimit){
        res.status(429).json({message:"too many request. please wait before requesting new otp"})
        return
    }

    const otp = Math.floor(100000+Math.random()*900000).toString()
    const otpKey = `otp:${email}`

    await redisCLient.set(otpKey,otp,{
        EX:300,
    })

    await redisCLient.set(rateLimitKey,"true",{
        EX:60,
    })

    const message = {
        to:email,
        subject:"your otp code",
        body:`your OTP is ${otp}. it is valid for 5 minutes`
    }

    await publishTOQueue("sent-otp",message)

    res.status(200).json({message:"OTP send to your mail"})


})