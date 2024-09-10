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

productRouter
  .route("/getCategories")
  .get((req, res) => new ProductController().getCategories(req, res));

productRouter
  .route("/addProduct")
  .post((req, res) => new ProductController().addProduct(req, res));

productRouter
  .route("/deleteProduct/:id")
  .delete((req, res) => new ProductController().deleteProduct(req, res));

productRouter
  .route("/addVariant/")
  .post((req, res) => new ProductController().addVariant(req, res));

productRouter
  .route("/updateTags/")
  .put((req, res) => new ProductController().updateTags(req, res));

productRouter
  .route("/updateProduct/:id")
  .put((req, res) => new ProductController().updateProduct(req, res));

productRouter
  .route("/reduceStock/")
  .put((req, res) => new ProductController().reduceStock(req, res));

export default productRouter;
