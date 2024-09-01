import express from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = express.Router();
productRouter
  .route("/getAllProducts")
  .get((req, res) => new ProductController().getAllProducts(req, res));

productRouter
  .route("/getProductsFromCollection")
  .post((req, res) =>
    new ProductController().getProductsFromCollection(req, res)
  );

productRouter
  .route("/getProductById/:id")
  .get((req, res) => new ProductController().getProductById(req, res));

productRouter
  .route("/search")
  .get((req, res) => new ProductController().searchProducts(req, res));

productRouter
  .route("/getReviews/:productId")
  .get((req, res) => new ProductController().getReviews(req, res));

productRouter
  .route("/submitReview")
  .post((req, res) => new ProductController().submitReview(req, res));

export default productRouter;
