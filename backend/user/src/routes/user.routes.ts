import express from "express"
import { getAllUser, getAUser, loginUser, myProfile, updateName, verifyUser } from "../controllers/user.controller"
import { isAuth } from "../middleware/isAuth"

const router = express.Router()

router.post('/login',loginUser)
router.post('/verify',verifyUser)
router.get('/me',isAuth,myProfile)
router.post("/update/user",isAuth,updateName)
router.get("/user/all",isAuth,getAllUser)
router.get("/user/:id",getAUser)


export default router