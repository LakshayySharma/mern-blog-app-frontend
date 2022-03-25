import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../actions/posts";
import { useNavigate } from "react-router-dom";
const CreatePostPage = () => {
  const navigate = useNavigate();
  const [postData, setpostData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setpostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    console.log(postData);
    dispatch(addPost(postData, token));
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-3 text-center">
            <label className="form-label">Title: </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 text-center">
            <label className="form-label">Description: </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              name="description"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 text-center">
            <label className="form-label">Content: </label>
          </div>
          <div className="col-9">
            <textarea
              name="content"
              rows="10"
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-block btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
