import mongoose from "mongoose";

const Answer = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: {
    type: String,
    required: false,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  selectedOption: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  discountCode: {
    type: String,
    required: false,
  },
  answeredAt: {
    type: Date,
    default: Date.now,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Answer", Answer, "answers");
