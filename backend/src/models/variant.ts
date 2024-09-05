import mongoose from "mongoose";

const Variant = new mongoose.Schema({
  model: {
    type: [String],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Variant", Variant, "variants");
