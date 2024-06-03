"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
class BookController {
    constructor() {
        this.getAll = (req, res) => {
            book_1.default.find({}).sort({ pages: 1 }).then(books => {
                res.json(books);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deleteBook = (req, res) => {
            book_1.default.deleteOne({ name: req.body.name }).then(books => {
                res.json({ message: "Book deleted" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Fail" });
            });
        };
        this.updateBook = (req, res) => {
            book_1.default.updateOne({ name: req.body.name }, { pages: req.body.pages }).then(books => {
                res.json({ message: "Book updated" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Fail" });
            });
        };
    }
}
exports.BookController = BookController;
