import Todo from './models/Todo';

const resolvers = {
  Query: {
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    getTodo: async (root: any, args: any) => {
      return await Todo.findById(args.id);
    },
  },
  Mutation: {
    addTodo: async (root: any, args: any) => {
      const newTodo = new Todo({
        title: args.title,
        detail: args.detail,
        date: args.date,
      });
      await newTodo.save();
      return newTodo;
    },
  },
};
export default resolvers;
