import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface TodoInterface {
  title: string;
  detail: string;
  date: Date;
  complete: boolean;
}

const todoSchema = new Schema<TodoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    detail: String,
    complete: Boolean,
    date: Date,
  },
  { timestamps: true }
);

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
