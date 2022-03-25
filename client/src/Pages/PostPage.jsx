import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deletePost, loadPost } from "../actions/posts";
import { useNavigate } from "react-router-dom";
import { commentPost } from "../actions/posts";
import { loadUser } from "../actions/user";
const PostPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadPost(params.id));
  }, [dispatch, params.id]);
  const handleDelete = (e) => {
    dispatch(deletePost(post._id));
    navigate("/");
  };
  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.user);
  if (post) {
    return (
      <div className="container">
        <div className="card mt-3">
          <div className="card-header bg-dark text-white">
            <h5 className="">{post.title}</h5>
          </div>
          <div className="card-body">
            <p>{post.description}</p>
            <p>{post.content}</p>
            <p className="card-footer">
              <em> By: {post.author}</em>
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                // const comment = prompt("enter comment");
                if (user.isAuthenticated) {
                  const comment = {
                    text: prompt("enter comment"),
                  };
                  dispatch(
                    commentPost(
                      params.id,
                      comment,
                      localStorage.getItem("token")
                    )
                  );
                } else {
                  navigate("/login");
                }
              }}
            >
              Comment
            </button>
            {user.user._id === post.userId && (
              <button className="btn btn-danger ms-3" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
        <h3 className="mt-4">Comments</h3>
        {post.comments.length > 0 ? (
          <div className="p-1">
            {post.comments.map((comment) => (
              <div className="card p-2 mt-2" key={comment._id}>
                <p className="card-text text-dark">{comment.text}</p>
                <em className="card-text text-dark">--{comment.name}--</em>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h6 className="text-center">No comments</h6>
          </div>
        )}
      </div>
    );
  }
  return <div>{params.id}</div>;
};

export default PostPage;
