"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter
    .route("/login")
    .post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter
    .route("/register")
    .post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter
    .route("/addToFavourites")
    .post((req, res) => new user_controller_1.UserController().addToFavourites(req, res));
userRouter
    .route("/getUserByUsername/:username")
    .get((req, res) => new user_controller_1.UserController().getUserByUsername(req, res));
userRouter
    .route("/changeFavourite")
    .post((req, res) => new user_controller_1.UserController().changeFavourite(req, res));
exports.default = userRouter;
