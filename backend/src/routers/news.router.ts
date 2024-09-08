import express from "express";
import { NewsController } from "../controllers/news.controller";
import news from "../models/news";

const newsRouter = express.Router();

newsRouter
  .route("/getAllNews")
  .get((req, res) => new NewsController().getAllNews(req, res));

newsRouter
  .route("/getNewsById/:id")
  .get((req, res) => new NewsController().getNewsById(req, res));

newsRouter
  .route("/getCommentsById/:id")
  .get((req, res) => new NewsController().getCommentsById(req, res));

newsRouter
  .route("/submitComment")
  .post((req, res) => new NewsController().submitComment(req, res));

newsRouter
  .route("/deleteNews/:id")
  .post((req, res) => new NewsController().deleteNews(req, res));

newsRouter
  .route("/updateNews/:id")
  .put((req, res) => new NewsController().updateNews(req, res));

newsRouter
  .route("/addNews")
  .post((req, res) => new NewsController().addNews(req, res));

newsRouter
  .route("/deleteComment")
  .post((req, res) => new NewsController().deleteComment(req, res));

export default newsRouter;
