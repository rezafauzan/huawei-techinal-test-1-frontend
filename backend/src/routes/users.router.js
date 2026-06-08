import { Router } from "express";
import * as userController from "../controllers/users.controller.js"
import { logMiddleware } from "../middleware/log.middleware.js";

const userRouter = Router()

userRouter.get("", logMiddleware, userController.getAllUsers)
userRouter.post("", logMiddleware, userController.createUser)
userRouter.delete("/:id", logMiddleware, userController.deleteUser)
userRouter.patch("/:id", logMiddleware, userController.updateUser)

export default userRouter
