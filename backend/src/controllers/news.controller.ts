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

  submitComment = (req: express.Request, res: express.Response) => {
    let comment = req.body;
    const newComment = new Comment(comment);
    newComment
      .save()
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  deleteNews = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    News.findByIdAndDelete(id)
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateNews = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const news = req.body;

    await News.findByIdAndUpdate(id, news, {
      new: true,
    })
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  addNews = (req: express.Request, res: express.Response) => {
    const news = req.body;
    console.log(news);
    const newNews = new News(news);
    newNews
      .save()
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  deleteComment = (req: express.Request, res: express.Response) => {
    const commentId = req.body.commentId;

    Comment.findByIdAndDelete(commentId)
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
}
