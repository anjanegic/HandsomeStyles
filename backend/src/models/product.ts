import mongoose from "mongoose";

enum ProductCategory {
  Jewelry = "Jewelry",
  Clothing = "Clothing",
  Accessories = "Accessories",
  Home = "Home",
}

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "EUR",
    },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    imageFilename: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    variants: [
      {
        name: {
          type: String,
        },
        color: {
          type: String,
        },
        model: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Product", Product, "products");
