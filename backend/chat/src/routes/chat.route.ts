import express from "express"
import { isAuth } from "../middlewares/isAuth"
import { createNewChat, getAllChat, sendMessage } from "../controller/chat.controller"
import { upload } from "../middlewares/multer"

const router = express.Router()

router.post ("/chat/new",isAuth,createNewChat)
router.get ("/chat/all",isAuth,getAllChat)
router.post("/message",isAuth,upload.single('image'),sendMessage)

export default router