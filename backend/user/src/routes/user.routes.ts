import express from "express"
import { loginUser } from "../controllers/user.controller"

const router = express.Router()

router.post('/login',loginUser)

export default router