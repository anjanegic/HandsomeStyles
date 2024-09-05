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

// !!!
// MULTER
// !!!

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }

  res.send({ filepath: `/uploads/${req.file.filename}` });
});

// !!!
// MULTER
// !!!

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/news", newsRouter);
router.use("/questions", questionRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
