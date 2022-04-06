import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface listNameInterface {
  listName: string;
}
export interface TodoInterface {
  title: string;
  listName: string;
  detail: string;
  complete: boolean;
  date: Date;
}

const todoSchema = new Schema<TodoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    listName: String,
    detail: String,
    complete: Boolean,
    date: Date,
  },
  { timestamps: true }
);

const listNameSchema = new Schema<listNameInterface>({
  listName: String,
});

export const Todo = mongoose.model('todo', todoSchema);
export const listName = mongoose.model('listName', listNameSchema);
