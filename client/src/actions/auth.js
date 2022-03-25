import axios from "axios";
import { loadUser } from "./user";
export const register = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/users`, user);
    console.log(res.data);
    localStorage.setItem("token", res.data.token);

    localStorage.setItem("token", res.data.token);

    dispatch(loadUser(localStorage.getItem("token")));
    dispatch({
      type: "REGISTER",
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data.errors[0].msg);
    alert(error.response.data.errors[0].msg);
  }
};
export const login = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/auth`, user);
    localStorage.setItem("token", res.data.token);

    dispatch(loadUser(localStorage.getItem("token")));
    dispatch({
      type: "LOG_IN",
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({
      type: "LOG_OUT",
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
