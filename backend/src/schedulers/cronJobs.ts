import cron from "node-cron";
import Question from "../models/question";

cron.schedule(
  "1 0 * * *",
  async () => {
    try {
      const allQuestions = await Question.find();
      const newQuestion =
        allQuestions[Math.floor(Math.random() * allQuestions.length)];

      await Question.updateOne(
        { isActive: true },
        { $set: { isActive: false } }
      );
      await Question.updateOne(
        { _id: newQuestion._id },
        { $set: { isActive: true } }
      );

      console.log("Daily question updated!");
    } catch (error) {
      console.error("Error updating daily question:", error);
    }
  },
  {
    timezone: "Europe/Belgrade",
  }
);
