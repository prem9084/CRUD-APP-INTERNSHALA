import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
