import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const handleEntry = async (e) => {
    e.preventDefault();
    try {
      const task = await axios.post("/api/v1/task/create-task", {
        title,
        discription,
        dueDate,
      });
      toast.success("Task created successfully");
      navigate("/all-task");
    } catch (error) {
      toast.error("Task creation failed" + error);
    }
  };

  return (
    <>
      <form className="w-50 m-auto mt-5" onSubmit={handleEntry}>
        <h2>Add Task</h2>
        <div className="mb-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Product Name"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            className="form-control"
            placeholder="discription"
          />
        </div>
        <div className="mb-5">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            placeholder="Amount"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default Task;
