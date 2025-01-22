"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listName = exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const taskSchema = new Schema({
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
exports.Task = mongoose_1.default.model("task", taskSchema);
exports.listName = mongoose_1.default.model("listName", listNameSchema);
