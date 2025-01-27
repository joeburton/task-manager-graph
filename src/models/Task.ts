import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ListNameInterface {
  listName: string;
  uid: string;
}

export interface TaskInterface {
  uid: string;
  title: string;
  listName: string;
  detail: string;
  complete: boolean;
  date: Date;
}

const TaskSchema = new Schema<TaskInterface>(
  {
    uid: {
      type: String,
      required: true,
    },
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

const ListNameSchema = new Schema<ListNameInterface>({
  listName: String,
  uid: String,
});

export const Task = mongoose.model("task", TaskSchema);
export const ListName = mongoose.model("listName", ListNameSchema);
