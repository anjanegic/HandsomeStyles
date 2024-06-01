import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import userRouter from './routers/user.router';
// import bookRouter from './routers/book.router';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/handsomeStyles");
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("DB Connected");
});

const router = express.Router();

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
