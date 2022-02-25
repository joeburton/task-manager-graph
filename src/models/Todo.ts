import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface TodoInterface {
  title: string;
  detail: string;
  date: Date;
}

const todoSchema = new Schema<TodoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    detail: String,
    date: Date,
  },
  { timestamps: true }
);

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
