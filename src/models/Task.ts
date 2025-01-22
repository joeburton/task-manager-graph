import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface listNameInterface {
  listName: string;
}
export interface TaskInterface {
  title: string;
  listName: string;
  detail: string;
  complete: boolean;
  date: Date;
}

const taskSchema = new Schema<TaskInterface>(
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

export const Task = mongoose.model("task", taskSchema);
export const listName = mongoose.model("listName", listNameSchema);
