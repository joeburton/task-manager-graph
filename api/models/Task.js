"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListName = exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TaskSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    listName: String,
    detail: String,
    complete: Boolean,
    date: Date,
}, { timestamps: true });
const ListNameSchema = new Schema({
    listName: String,
    uid: String,
});
exports.Task = mongoose_1.default.model("task", TaskSchema);
exports.ListName = mongoose_1.default.model("listName", ListNameSchema);
