import express from "express";
import { QuestionController } from "../controllers/question.controller";

const questionRouter = express.Router();
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
export default questionRouter;
