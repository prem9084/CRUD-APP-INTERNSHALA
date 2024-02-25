import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
const AllTask = () => {
  const [task, setTask] = useState([]);

  const GetAllTasks = async () => {
    try {
      const { data } = await axios.get("/api/v1/task/get-task");
      setTask(data.task);

      toast.success("Get All Product Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you sure you want to delete ?");
      if (!answer) return;
      const task = await axios.delete(`/api/v1/task/delete-task/${id}`);
      setTask((prevTask) => prevTask.filter((task) => task._id !== id));

      toast.success("Product Delete Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="mt-5 text-center">ALL Task</h2>
      <table className="table  table-striped  w-50 m-auto mt-5 col-md-6 col-sm-12">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sales id:</th>
            <th scope="col">Your Tast</th>
            <th scope="col">Discription</th>
            <th scope="col">DueDate</th>
          </tr>
        </thead>
        <tbody>
          <>
            {task?.map((task, index) => (
              <tr key={task._id}>
                <th scope="row">{index + 1}</th>
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.discription}</td>
                <td>{task.dueDate}</td>

                <DeleteIcon
                  onClick={() => handleDelete(task._id)}
                  className="ms-1"
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    color: "red",
                  }}
                />
                <Link to={`/update-task/${task._id}`}>
                  <EditIcon
                    className="ms-1"
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      color: "green",
                    }}
                  />
                </Link>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default AllTask;
