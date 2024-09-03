import mongoose from "mongoose";

const Question = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [
      {
        text: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Question", Question, "questions");
