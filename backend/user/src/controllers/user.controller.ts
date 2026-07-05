
import { redisCLient } from "../index";
import { TryCatch } from "../config/tryCatch";
import { publishTOQueue } from "../config/rabbitmq";
import { User } from "../model/User";
import { generateToken } from "../config/generateToken";
import { AuthenticatedRequest } from "../middleware/isAuth";

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


export const verifyUser = TryCatch(async(req,res)=>{
    const {email,otp:enteredOtp} = req.body

    if(!email || !enteredOtp){
        res.status(400).json({message:"email or OTP requires"})
        return 
    }

    const otpKey = `otp:${email}`

    const storedOtp = await redisCLient.get(otpKey)

    if(!storedOtp || storedOtp !==enteredOtp){
        res.status(400).json({
            message:"invalid or expired otp"
        })
        return
    }

    await redisCLient.del(otpKey)

    let user = await User.findOne({email})

    if(!user){
        const name = email.slice(0,8)
        user = await User.create({name,email})
    }

    const token = generateToken(user)

    res.json({
        message:"user verified",
        user,
        token})
})

export const myProfile = TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user = req.user

    res.json(user)
})