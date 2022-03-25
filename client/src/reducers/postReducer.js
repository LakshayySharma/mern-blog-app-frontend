const initialState = {
  post: null,
  posts: [],
  loading: true,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POSTS_LOADED":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "POST_LOADED":
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "ADD_COMMENT":
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
      };
    case "POST_DELETED":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        post: null,
      };
    default:
      return state;
  }
};

export default postReducer;
