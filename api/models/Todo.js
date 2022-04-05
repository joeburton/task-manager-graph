"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListId = exports.Todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    listId: String,
    detail: String,
    complete: Boolean,
    date: Date,
}, { timestamps: true });
const listIdSchema = new Schema({
    listId: String,
});
exports.Todo = mongoose_1.default.model('todo', todoSchema);
exports.ListId = mongoose_1.default.model('listId', listIdSchema);
