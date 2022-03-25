import React from "react";
import { NavLink } from "react-router-dom";

const Posts = ({ author, title, description, id, content, date }) => {
  return (
    <div className="card mb-3">
      <div className="card-header bg-dark text-white">
        <h5 className="">{title}</h5>
      </div>
      <div className="card-body">
        <p>{description}</p>

        <p className="card-footer">
          <em> By: {author}</em>
          <NavLink className="m-2" to={`posts/${id}`}>
            <button className="btn btn-sm btn-info">See Post</button>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Posts;
