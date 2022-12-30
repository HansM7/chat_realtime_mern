import express from "express"
import { getMessagesController, registerMessage } from "../controllers/chat.controller.js"

const router = express.Router()


router.post("/send-message", registerMessage)
router.get("/messages/:username", getMessagesController)

export default router