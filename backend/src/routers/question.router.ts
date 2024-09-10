import express from "express";
import { QuestionController } from "../controllers/question.controller";

const questionRouter = express.Router();

questionRouter
  .route("/getAllQuestions")
  .get((req, res) => new QuestionController().getAllQuestions(req, res));

questionRouter
  .route("/getQuestions")
  .get((req, res) => new QuestionController().getQuestions(req, res));

questionRouter
  .route("/getQuestionById/:id")
  .get((req, res) => new QuestionController().getQuestionById(req, res));

questionRouter
  .route("/answerQuestion")
  .post((req, res) => new QuestionController().answerQuestion(req, res));

questionRouter
  .route("/check-discount-code")
  .get((req, res) => new QuestionController().checkDiscountCode(req, res));

questionRouter
  .route("/used-discount-code")
  .get((req, res) => new QuestionController().usedDiscountCode(req, res));

questionRouter
  .route("/change-answer")
  .post((req, res) => new QuestionController().changeAnswer(req, res));

questionRouter
  .route("/delete-question")
  .post((req, res) => new QuestionController().deleteQuestion(req, res));

questionRouter
  .route("/update-question")
  .post((req, res) => new QuestionController().updateQuestion(req, res));
questionRouter
  .route("/add-question")
  .post((req, res) => new QuestionController().addQuestion(req, res));

export default questionRouter;
