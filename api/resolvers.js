"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("./models/Todo"));
const resolvers = {
    Query: {
        getTodos: () => __awaiter(void 0, void 0, void 0, function* () {
            const todos = yield Todo_1.default.find();
            return todos;
        }),
        getTodo: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Todo_1.default.findById(args.id);
        }),
    },
    Mutation: {
        addTodo: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newTodo = new Todo_1.default({
                title: args.title,
                detail: args.detail,
                complete: args.complete,
                date: args.date,
            });
            yield newTodo.save();
            return newTodo;
        }),
        deleteTodo: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            yield Todo_1.default.findByIdAndDelete(args.id);
            return 'The todo has been deleted.';
        }),
        deleteBulk: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield Todo_1.default.deleteMany({ title: args.title });
            return JSON.stringify(result);
        }),
        updateTodo: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, title, detail, complete, date } = args;
            const updatedTodo = {};
            if (title !== undefined) {
                updatedTodo.title = title;
            }
            if (detail !== undefined) {
                updatedTodo.detail = detail;
            }
            if (complete !== undefined) {
                updatedTodo.complete = complete;
            }
            if (date !== undefined) {
                updatedTodo.date = date;
            }
            const todo = yield Todo_1.default.findByIdAndUpdate(id, updatedTodo, { new: true });
            return todo;
        }),
    },
};
exports.default = resolvers;
