import React from "react";
import { useState } from "react";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { register } from "../actions/auth";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    picture: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data));
    navigate("/");
  };
  return (
    <div>
      <h3 className="text-center">Sign up</h3>
      <form>
        <label className="form-label">Name: </label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
        />
        <label className="form-label">Email: </label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
        />
        <label className="form-label">Password: </label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />
        <label className="form-label">Picture: </label>
        <input
          type="text"
          name="picture"
          className="form-control"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary mt-3"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
