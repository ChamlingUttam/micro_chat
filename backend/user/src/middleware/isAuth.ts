import "dotenv/config"
import { NextFunction, Request, Response } from "express";


import { IUser } from "../model/User";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface AuthenticatedRequest extends Request {
    user ?: IUser | null

}

export const isAuth = async(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<void>=>{

    try {
        const authHeader = req.headers.authorization 

        if(!authHeader || !authHeader.startsWith("Bearer ")){
             res.status(401).json({message:"NO auth header"})
             return 
        }

        const token = authHeader.split(" ")[1] as string
        const decodedValue = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload

        if(!decodedValue || !decodedValue.user){
            res.status(401).json({message:"invalid token"})
            return 
            
        }

        req.user = decodedValue.user
        next()
    } catch (error) {
        res.status(401).json({
            message:"no JWT error"
        })
        
    }

}
