import { Task, listName, TaskInterface } from "./models/Task";
import { GraphQLScalarType, Kind } from "graphql";

const ScalarDate = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return new Date(value).toLocaleDateString(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: ScalarDate,
  Query: {
    getListNames: async () => {
      const listNames = await listName.find();
      return listNames;
    },
    getTasks: async () => {
      const tasks = await Task.find();
      return tasks;
    },
    getTask: async (root: any, args: any) => {
      return await Task.findById(args.id);
    },
  },
  Mutation: {
    deleteListName: async (root: any, args: any) => {
      await listName.findByIdAndDelete(args.id);
      return "The list ID has been deleted.";
    },
    addListName: async (root: any, args: any) => {
      const newList = new listName({
        listName: args.listName,
      });
      await newList.save();
      return newList;
    },
    addTask: async (root: any, args: any) => {
      const newTask = new Task({
        title: args.title,
        listName: args.listName,
        detail: args.detail,
        complete: args.complete,
        date: args.date,
      });
      await newTask.save();
      return newTask;
    },
    deleteTask: async (root: any, args: any) => {
      await Task.findByIdAndDelete(args.id);
      return "The task has been deleted.";
    },
    deleteBulk: async (root: any, args: any) => {
      const result = await Task.deleteMany({ title: args.title });
      return JSON.stringify(result);
    },
    updateTask: async (_root: any, args: any) => {
      const { id, listName, title, detail, complete, date } = args;
      const updatedTask = {} as TaskInterface;

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

      const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

      return task;
    },
  },
};

export default resolvers;
