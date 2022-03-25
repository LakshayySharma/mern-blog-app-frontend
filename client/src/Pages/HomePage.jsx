import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPosts } from "../actions/posts";
import Post from "../Components/Post";
const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h1 className="p-5 text-center bg-dark text-white">Blog App</h1>
      </div>
      <div className="text-center">
        <NavLink to="add-post" className="btn btn-primary">
          Write new Post
        </NavLink>
        {/* <button className="btn btn-primary"></button> */}
      </div>
      <div className="container">
        <h2 className="mt-3 mb-3">All articles</h2>
        {posts.length !== 0 ? (
          posts.map((post) => (
            <Post
              author={post.author}
              key={post._id}
              content={post.content}
              date={post.date}
              title={post.title}
              id={post._id}
              description={post.description}
            />
          ))
        ) : (
          <h6>No Posts Found</h6>
        )}
      </div>
    </div>
  );
};

export default HomePage;
