import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Registration = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const task = await axios.post("/api/v1/auth/register", {
        fname,
        lname,
        email,
        password,
      });
      toast.success("User Register Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-containter ">
      <form className="register-form p-5 rounded" onSubmit={handleSubmit}>
        <h1 className="mb-5">Do Registration Here!</h1>
        <div className="mb-4">
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="form-control"
            placeholder="Enter First Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="form-control"
            id="exampleInputfname"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputlname"
            placeholder="Enter Email "
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputpassword"
            placeholder="Enter Password"
          />
        </div>

        <div className="d-flex justify-content-between">
          <p>
            Already Register <Link to="/login">Login</Link>
          </p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
