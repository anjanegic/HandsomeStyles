import express from "express";
import Product from "../models/product";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
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
}
