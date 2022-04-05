import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ListIdInterface {
  listId: string;
}
export interface TodoInterface {
  title: string;
  listId: string;
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
    listId: String,
    detail: String,
    complete: Boolean,
    date: Date,
  },
  { timestamps: true }
);

const listIdSchema = new Schema<ListIdInterface>({
  listId: String,
});

export const Todo = mongoose.model('todo', todoSchema);
export const ListId = mongoose.model('listId', listIdSchema);
