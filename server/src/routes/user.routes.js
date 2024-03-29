import express from "express"
import { createUserController, getUserController, getUsersController, loginController } from "../controllers/user.controllers.js"
import { encryptPassword, login } from "./middlewares/user.middleware.js"
import { verifyUserForToken } from "./middlewares/user.token.js"

const router = express.Router()


router.get("/users", getUsersController)
router.get("/user/:id", getUserController)
router.post("/create",encryptPassword,createUserController)

router.post("/login",login, verifyUserForToken, loginController)

export default router
