import { Todo, listName, TodoInterface } from './models/Todo';
import { GraphQLScalarType, Kind } from 'graphql';

const ScalarDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
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
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    getTodo: async (root: any, args: any) => {
      return await Todo.findById(args.id);
    },
  },
  Mutation: {
    deleteListName: async (root: any, args: any) => {
      await listName.findByIdAndDelete(args.id);
      return 'The list ID has been deleted.';
    },
    addListName: async (root: any, args: any) => {
      const newList = new listName({
        listName: args.listName,
      });
      await newList.save();
      return newList;
    },
    addTodo: async (root: any, args: any) => {
      const newTodo = new Todo({
        title: args.title,
        listName: args.listName,
        detail: args.detail,
        complete: args.complete,
        date: args.date,
      });
      await newTodo.save();
      return newTodo;
    },
    deleteTodo: async (root: any, args: any) => {
      await Todo.findByIdAndDelete(args.id);
      return 'The todo has been deleted.';
    },
    deleteBulk: async (root: any, args: any) => {
      const result = await Todo.deleteMany({ title: args.title });
      return JSON.stringify(result);
    },
    updateTodo: async (root: any, args: any) => {
      const { id, listName, title, detail, complete, date } = args;
      const updatedTodo = {} as TodoInterface;

      console.log({ id, title, listName, detail, complete, date });

      if (title !== undefined) {
        updatedTodo.title = title;
      }

      if (listName !== undefined) {
        updatedTodo.listName = listName;
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

      const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });

      return todo;
    },
  },
};
export default resolvers;
