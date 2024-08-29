import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));

userRouter
  .route("/register")
  .post((req, res) => new UserController().register(req, res));

userRouter
  .route("/change-data")
  .post((req, res) => new UserController().changeData(req, res));

userRouter
  .route("/addToFavourites")
  .post((req, res) => new UserController().addToFavourites(req, res));

userRouter
  .route("/getUserByUsername/:username")
  .get((req, res) => new UserController().getUserByUsername(req, res));

userRouter
  .route("/changeFavourite")
  .post((req, res) => new UserController().changeFavourite(req, res));

userRouter
  .route("/removeFromWishlist")
  .post((req, res) => new UserController().removeFromWishlist(req, res));

userRouter
  .route("/addToWishlist")
  .post((req, res) => new UserController().addToWishlist(req, res));

userRouter
  .route("/addOrder")
  .post((req, res) => new UserController().addOrder(req, res));

userRouter
  .route("/getOrders/:userId")
  .get((req, res) => new UserController().getOrders(req, res));

export default userRouter;
