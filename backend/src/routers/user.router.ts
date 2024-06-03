import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/addToFavourites").post(
    (req,res)=>new UserController().addToFavourites(req,res)
)

userRouter.route("/getUserByUsername/:username").get(
    (req,res)=>new UserController().getUserByUsername(req,res)
)

userRouter.route("/changeFavourite").post(
    (req,res)=>new UserController().changeFavourite(req,res)
)


export default userRouter;