"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var UserType;
(function (UserType) {
    UserType["Admin"] = "admin";
    UserType["Manager"] = "manager";
    UserType["User"] = "user";
})(UserType || (UserType = {}));
const User = new mongoose_1.default.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: Object.values(UserType),
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    approved: {
        type: Boolean,
    },
    deleted: {
        type: Boolean,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("User", User, "users");
