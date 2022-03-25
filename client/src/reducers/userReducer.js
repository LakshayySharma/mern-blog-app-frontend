const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  name: null,
  token: localStorage.getItem("token"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        name: action.payload.name,
      };
    case "REGISTER":
    case "LOG_IN":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        token: null,
        name: null,
      };
    default:
      return state;
  }
};

export default userReducer;
