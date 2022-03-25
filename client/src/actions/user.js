import axios from "axios";
export const loadUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth", {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};
