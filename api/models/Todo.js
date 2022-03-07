"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    detail: String,
    complete: Boolean,
    date: Date,
}, { timestamps: true });
const Todo = mongoose_1.default.model('todo', todoSchema);
exports.default = Todo;
