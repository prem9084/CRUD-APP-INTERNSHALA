import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/task/update-task/${id}`, {
        title,
        discription,
        dueDate,
      });

      toast.success("Product Updated Successfully");

      navigate("/all-task");
    } catch (error) {
      console.log(error);
    }
  };

  // get single products

  const getSingleTask = async () => {
    try {
      const { data } = await axios.get(`/api/v1/task/single-task/${params.id}`);
      setTitle(data.task.title);
      setDiscription(data.task.discription);
      setDueDate(data.task.dueDate);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, [params.id]);

  return (
    <form className="w-50 m-auto mt-5" onSubmit={handleUpdate}>
      <h2>UPDATE FROM</h2>

      <>
        <div className="mb-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Task Name"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            id="discription"
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="mb-5">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            placeholder="Task Name"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </>
    </form>
  );
};

export default UpdateTask;
