import express from "express";
import Question from "../models/question";
import Answer from "../models/answer";
import { Request, Response } from "express-serve-static-core";
import { generateDiscountCode } from "../utils/generateDiscountCode";

export class QuestionController {
  getQuestions = (req: express.Request, res: express.Response) => {
    Question.find({ isActive: true })
      .then((questions) => {
        res.json(questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getQuestionById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    Question.findById(id)
      .then((question) => {
        res.json(question);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Došlo je do greške prilikom pretrage pitanja." });
      });
  };

  answerQuestion = async (req: Request, res: Response) => {
    const { userId, sessionId, questionId, selectedOption } = req.body;

    try {
      const question = await Question.findById(questionId);

      if (!question) {
        return res.json({ message: "Question not found" });
      }

      const today = new Date().toISOString().split("T")[0];
      const existingAnswer = await Answer.findOne({
        $or: [
          { userId, questionId, answeredAt: { $gte: new Date(today) } },
          { sessionId, questionId, answeredAt: { $gte: new Date(today) } },
        ],
      });

      if (existingAnswer) {
        return res.json({
          message: "You have already answered this question today",
        });
      }

      const isCorrect = question.options.some(
        (option) => option.text === selectedOption && option.isCorrect
      );

      const discountCode = isCorrect ? generateDiscountCode() : null;
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const answer = new Answer({
        userId,
        sessionId,
        questionId,
        selectedOption,
        isCorrect,
        discountCode,
        expiresAt,
      });

      await answer.save();

      res.json({
        success: true,
        isCorrect,
        discountCode,
        expiresAt,
      });
    } catch (error) {
      res.json({ message: "An error occurred while processing your answer." });
    }
  };

  checkDiscountCode = async (req: Request, res: Response) => {
    Answer.findOne({ discountCode: req.query.code })
      .then((answer) => {
        if (answer && answer.used === false) {
          res.json({ valid: true, amount: 0.1 });
        } else {
          res.json({ valid: false, amount: 0 });
        }
      })
      .catch((err) => {
        console.error("Error fetching answer:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  usedDiscountCode = async (req: Request, res: Response) => {
    const { code } = req.query;

    try {
      const answer = await Answer.findOne({ discountCode: code, used: false });

      if (answer) {
        await Answer.updateOne({ _id: answer._id }, { $set: { used: true } });
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      res.json({ success: false });
    }
  };
}
