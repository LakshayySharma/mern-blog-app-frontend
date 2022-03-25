import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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
    dispatch(login(data));
    navigate("/");
  };
  return (
    <div className="container">
      <h3 className="text-center">Log In</h3>
      <form>
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

export default LoginPage;
