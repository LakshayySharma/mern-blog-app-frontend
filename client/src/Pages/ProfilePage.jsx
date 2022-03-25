import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadUser } from "../actions/user";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(loadUser(localStorage.getItem("token")));
  const user = useSelector((state) => state.user);
  const profile = user.user;
  return (
    <div className="container">
      <div className="row mt-5 shadow p-1">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <img
            className="rounded-circle"
            width="40%"
            src={profile.picture}
            alt="my_picture"
          />
        </div>
        <div className="col-6 d-flex align-items-center justify-content-center">
          <h1>{profile.name}</h1>
        </div>
      </div>
      <div className="row mt-5">
        <h3>{`${profile.name}'s`} posts</h3>
        {profile.posts.length > 0 ? (
          <div className="row">
            {profile.posts.map((post) => (
              <div className="col-5 border me-2 p-3 rounded shadow ">
                <h6>{post.title}</h6>
                <p>{post.description}</p>
                <button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <h6>No posts Found!</h6>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-post")}
            >
              Let's Write a post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
