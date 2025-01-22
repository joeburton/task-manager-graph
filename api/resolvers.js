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
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("./models/Task");
const graphql_1 = require("graphql");
const ScalarDate = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
        return new Date(value).toLocaleDateString(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
const resolvers = {
    Date: ScalarDate,
    Query: {
        getListNames: () => __awaiter(void 0, void 0, void 0, function* () {
            const listNames = yield Task_1.listName.find();
            return listNames;
        }),
        getTasks: () => __awaiter(void 0, void 0, void 0, function* () {
            const tasks = yield Task_1.Task.find();
            return tasks;
        }),
        getTask: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Task_1.Task.findById(args.id);
        }),
    },
    Mutation: {
        deleteListName: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            yield Task_1.listName.findByIdAndDelete(args.id);
            return "The list ID has been deleted.";
        }),
        addListName: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newList = new Task_1.listName({
                listName: args.listName,
            });
            yield newList.save();
            return newList;
        }),
        addTask: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const newTask = new Task_1.Task({
                title: args.title,
                listName: args.listName,
                detail: args.detail,
                complete: args.complete,
                date: args.date,
            });
            yield newTask.save();
            return newTask;
        }),
        deleteTask: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            yield Task_1.Task.findByIdAndDelete(args.id);
            return "The task has been deleted.";
        }),
        deleteBulk: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield Task_1.Task.deleteMany({ title: args.title });
            return JSON.stringify(result);
        }),
        updateTask: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, listName, title, detail, complete, date } = args;
            const updatedTask = {};
            console.log({ id, title, listName, detail, complete, date });
            if (title !== undefined) {
                updatedTask.title = title;
            }
            if (listName !== undefined) {
                updatedTask.listName = listName;
            }
            if (detail !== undefined) {
                updatedTask.detail = detail;
            }
            if (complete !== undefined) {
                updatedTask.complete = complete;
            }
            if (date !== undefined) {
                updatedTask.date = date;
            }
            const task = yield Task_1.Task.findByIdAndUpdate(id, updatedTask, { new: true });
            return task;
        }),
    },
};
exports.default = resolvers;
