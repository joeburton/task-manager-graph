import { ListName, Task, TaskInterface } from "./models/Task";
import { GraphQLScalarType, Kind } from "graphql";

const ScalarDate = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return new Date(value).toLocaleDateString(); // Convert outgoing Date to string for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming value to Date
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
    getListNames: async (_root: any, args: any) => {
      try {
        const listNames = await ListName.find({ uid: args.uid });
        return listNames;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get list names: ${error.message}`);
        } else {
          throw new Error("Failed to get list names: unknown error");
        }
      }
    },
    getTasks: async (_root: any, args: any) => {
      try {
        const tasks = await Task.find({ uid: args.uid });
        return tasks;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get tasks: ${error.message}`);
        } else {
          throw new Error("Failed to get tasks: unknown error");
        }
      }
    },
    getTask: async (_root: any, args: any) => {
      try {
        return await Task.findById(args.id);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get task: ${error.message}`);
        } else {
          throw new Error("Failed to get task: unknown error");
        }
      }
    },
  },
  Mutation: {
    deleteListName: async (_root: any, args: any) => {
      try {
        await ListName.findByIdAndDelete(args.id);
        return "The list ID has been deleted.";
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete list name: ${error.message}`);
        } else {
          throw new Error("Failed to delete list name: unknown error");
        }
      }
    },
    addListName: async (_root: any, args: any) => {
      try {
        const newList = new ListName({
          listName: args.listName,
          uid: args.uid,
        });
        await newList.save();
        return newList;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to add list name: ${error.message}`);
        } else {
          throw new Error("Failed to add list name: unknown error");
        }
      }
    },
    addTask: async (_root: any, args: any) => {
      try {
        const newTask = new Task({
          uid: args.uid,
          title: args.title,
          listName: args.listName,
          detail: args.detail,
          complete: args.complete,
          date: args.date,
        });
        await newTask.save();
        return newTask;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to add task: ${error.message}`);
        } else {
          throw new Error("Failed to add task: unknown error");
        }
      }
    },
    deleteTask: async (_root: any, args: any) => {
      try {
        await Task.findByIdAndDelete(args.id);
        return "The task has been deleted.";
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete task: ${error.message}`);
        } else {
          throw new Error("Failed to delete task: unknown error");
        }
      }
    },
    deleteBulk: async (_root: any, args: any) => {
      try {
        const result = await Task.deleteMany({ title: args.title });
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete tasks in bulk: ${error.message}`);
        } else {
          throw new Error("Failed to delete tasks in bulk: unknown error");
        }
      }
    },
    updateTask: async (_root: any, args: any) => {
      try {
        const { id, listName, title, detail, complete, date } = args;
        const updatedTask = {} as TaskInterface;

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

        const task = await Task.findByIdAndUpdate(id, updatedTask, {
          new: true,
        });

        return task;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to update task: ${error.message}`);
        } else {
          throw new Error("Failed to update task: unknown error");
        }
      }
    },
  },
};

export default resolvers;
