import express from "express";
import Product from "../models/product";
import Category from "../models/category";
import Review from "../models/review";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Types } from "mongoose";
export class ProductController {
  getProductsFromCollection = (req: express.Request, res: express.Response) => {
    let collection = req.body.collection;

    Product.find({ tags: collection })
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Došlo je do greške prilikom pretrage proizvoda." });
      });
  };

  getAllProducts(req: express.Request, res: express.Response) {
    Product.find({})
      .sort({ sold: -1 })
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProductById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    Product.findById(id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Došlo je do greške prilikom pretrage proizvoda." });
      });
  };

  async searchProducts(req: Request, res: Response) {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(200).json([]);
      }

      const products = await Product.find({
        name: { $regex: query, $options: "i" },
      });

      res.json(products);
    } catch (error) {
      console.error("Error during product search:", error);
      res.status(500).json({ message: "Error during product search." });
    }
  }

  getReviews = (req: express.Request, res: express.Response) => {
    let productId = req.params.productId;

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(productId);

    Review.find({ productId: theId })
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
  submitReview = (req: express.Request, res: express.Response) => {
    let review = req.body;
    console.log(review);
    const newReview = new Review(review);
    newReview
      .save()
      .then((review) => {
        res.json(review);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getCategories = (req: express.Request, res: express.Response) => {
    Category.find({})
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  addProduct = async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const {
      name,
      description,
      price,
      category,
      stock,
      imageFilename,
      tags,
      rating,
      reviews,
      variants,
    } = req.body;

    try {
      const product = await Product.create({
        name,
        description,
        price,
        currency: "EUR",
        category,
        stock,
        sold: 0,
        imageFilename,
        tags,
        rating,
        reviews,
        variants,
      });

      res.json(product);
    } catch (error) {
      res.json({ message: error });
    }
  };

  deleteProduct = (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  addVariant = (req: express.Request, res: express.Response) => {
    const product = req.body;
    console.log(product);
    Product.findByIdAndUpdate(product._id, {
      $set: { variants: product.variants },
    })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  updateTags = (req: express.Request, res: express.Response) => {
    const product = req.body;
    console.log(product);
    Product.findByIdAndUpdate(product._id, {
      $set: { tags: product.tags },
    })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
}
