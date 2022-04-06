"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listName = exports.Todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    listName: String,
    detail: String,
    complete: Boolean,
    date: Date,
}, { timestamps: true });
const listNameSchema = new Schema({
    listName: String,
});
exports.Todo = mongoose_1.default.model('todo', todoSchema);
exports.listName = mongoose_1.default.model('listName', listNameSchema);
