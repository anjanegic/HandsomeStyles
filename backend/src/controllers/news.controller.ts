import express from "express";
import News from "../models/news";
import Comment from "../models/comments";

export class NewsController {
  getAllNews = (req: express.Request, res: express.Response) => {
    News.find({})
      .sort({ date: -1 })
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNewsById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    News.findById(id)
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCommentsById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    Comment.find({ newsId: id })
      .then((comments) => {
        res.json(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
