import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  newsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "News",
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema, "comments");
