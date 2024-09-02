import express from "express";
import { NewsController } from "../controllers/news.controller";

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

export default newsRouter;
