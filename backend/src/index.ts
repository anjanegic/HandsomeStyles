import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import multer from "multer";
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import newsRouter from "./routers/news.router";
import "./schedulers/cronJobs";
import questionRouter from "./routers/question.router";

const CORS: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
};

const app = express();
app.use(cors(CORS));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/handsomeStyles");
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("DB Connected");
});

const upload = multer({ dest: "uploads/" }); // Privremena lokacija za čuvanje fajlova pre nego što se pošalju na GridFS

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/news", newsRouter);
router.use("/questions", questionRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
