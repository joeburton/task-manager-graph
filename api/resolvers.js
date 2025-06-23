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
        return new Date(value).toLocaleDateString(); // Convert outgoing Date to string for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming value to Date
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
        getListNames: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const listNames = yield Task_1.ListName.find({ uid: args.uid });
                return listNames;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to get list names: ${error.message}`);
                }
                else {
                    throw new Error("Failed to get list names: unknown error");
                }
            }
        }),
        getTasks: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const tasks = yield Task_1.Task.find({ uid: args.uid });
                return tasks;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to get tasks: ${error.message}`);
                }
                else {
                    throw new Error("Failed to get tasks: unknown error");
                }
            }
        }),
        getTask: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield Task_1.Task.findById(args.id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to get task: ${error.message}`);
                }
                else {
                    throw new Error("Failed to get task: unknown error");
                }
            }
        }),
    },
    Mutation: {
        deleteListName: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield Task_1.ListName.findByIdAndDelete(args.id);
                return "The list ID has been deleted.";
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete list name: ${error.message}`);
                }
                else {
                    throw new Error("Failed to delete list name: unknown error");
                }
            }
        }),
        addListName: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newList = new Task_1.ListName({
                    listName: args.listName,
                    uid: args.uid,
                });
                yield newList.save();
                return newList;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to add list name: ${error.message}`);
                }
                else {
                    throw new Error("Failed to add list name: unknown error");
                }
            }
        }),
        addTask: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newTask = new Task_1.Task({
                    uid: args.uid,
                    title: args.title,
                    listName: args.listName,
                    detail: args.detail,
                    complete: args.complete,
                    date: args.date,
                });
                yield newTask.save();
                return newTask;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to add task: ${error.message}`);
                }
                else {
                    throw new Error("Failed to add task: unknown error");
                }
            }
        }),
        deleteTask: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield Task_1.Task.findByIdAndDelete(args.id);
                return "The task has been deleted.";
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete task: ${error.message}`);
                }
                else {
                    throw new Error("Failed to delete task: unknown error");
                }
            }
        }),
        deleteBulk: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield Task_1.Task.deleteMany({ title: args.title });
                return JSON.stringify(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete tasks in bulk: ${error.message}`);
                }
                else {
                    throw new Error("Failed to delete tasks in bulk: unknown error");
                }
            }
        }),
        updateTask: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, listName, title, detail, complete, date } = args;
                const updatedTask = {};
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
                const task = yield Task_1.Task.findByIdAndUpdate(id, updatedTask, {
                    new: true,
                });
                return task;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update task: ${error.message}`);
                }
                else {
                    throw new Error("Failed to update task: unknown error");
                }
            }
        }),
    },
};
exports.default = resolvers;
