import taskModel from "../model/taskModel.js";
// for create task

export const createTask = async (req, res) => {
  try {
    const { title, discription, dueDate } = req.body;

    // validations

    if (!title) {
      return res.status(404).send({ message: "Title is required" });
    }
    if (!discription) {
      return res.status(404).send({ message: "Discription is required" });
    }
    if (!dueDate) {
      return res.status(404).send({ message: "duedate is required" });
    }

    const task = await taskModel({
      title,
      discription,
      dueDate,
    });

    await task.save();

    res.status(200).send({
      success: true,
      message: "task Create successfully",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

// for update

export const updateTask = async (req, res) => {
  try {
    const { title, discription, dueDate } = req.body;
    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Task successfully updated",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete task

export const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

// getAllTask

export const getAllTask = async (req, res) => {
  try {
    const task = await taskModel.find({});
    res.status(200).send({
      totalTask: task.length,
      success: true,
      message: "All Tasks fatch succeesfully",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

// single task

export const singleTaskController = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await taskModel.findById({
      _id,
    });

    res.status(200).send({
      success: true,
      message: "Get Single Task Successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};
