import express from "express";
import { UserController } from "../controllers/user.controller";
import user from "../models/user";

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

userRouter
  .route("/getReviews/:userId")
  .get((req, res) => new UserController().getReviews(req, res));

userRouter
  .route("/getUserById/:id")
  .get((req, res) => new UserController().getUserById(req, res));

userRouter
  .route("/deleteReview")
  .post((req, res) => new UserController().deleteReview(req, res));

userRouter
  .route("/getNotApprovedUsers")
  .get((req, res) => new UserController().getNotApprovedUsers(req, res));

userRouter
  .route("/approveUser")
  .post((req, res) => new UserController().approveUser(req, res));

userRouter
  .route("/getAllUsers")
  .get((req, res) => new UserController().getAllUsers(req, res));

userRouter
  .route("/deleteUser")
  .post((req, res) => new UserController().deleteUser(req, res));

userRouter
  .route("/updateOrderStatus")
  .post((req, res) => new UserController().updateOrderStatus(req, res));

userRouter
  .route("/resetPassword")
  .post((req, res) => new UserController().resetPassword(req, res));

export default userRouter;
