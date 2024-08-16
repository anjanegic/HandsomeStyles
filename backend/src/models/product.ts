import mongoose from "mongoose";

enum ProductCategory {
  Jewelry = "Jewelry",
  Clothing = "Clothing",
  Accessories = "Accessories",
  Home = "Home",
}

// Enum za varijante proizvoda
enum ProductVariant {
  Color = "Color",
  Size = "Size",
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
      type: String, // Možete koristiti URL ili putanju ako čuvate slike na disku
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
        type: String,
        enum: Object.values(ProductVariant),
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Product", Product, "products");
