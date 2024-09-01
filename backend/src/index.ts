import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { createReadStream, unlink } from "fs";
import multer, { FileFilterCallback } from "multer"; // Import multer tipove
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import newsRouter from "./routers/news.router";
import path from "path";
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

// Ruta za upload datoteke
app.post(
  "/upload-product-image",
  upload.single("image"),
  (req: Request, res: Response) => {
    // Proverite da li je req.file definisan
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const file = req.file;

    // @ts-ignore
    const bucket = new GridFSBucket(conn.db);
    const uploadStream = bucket.openUploadStream(req.file.originalname);

    createReadStream(req.file.path)
      .pipe(uploadStream)
      .on("error", (error: Error) => {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file");
      })
      .on("finish", () => {
        unlink(file.path, (err) => {
          // Očisti privremeni fajl
          if (err) console.error("Error deleting temporary file:", err);
        });
        res.status(201).send({
          message: "File uploaded successfully",
          filename: file.originalname,
        });
      });
  }
);

// Serviranje statičkih fajlova iz `public/uploads/products` direktorijuma
app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "public", "uploads", "products"))
);

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/news", newsRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
