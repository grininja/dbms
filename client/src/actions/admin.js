import apiCall from "../apiCall";

export const isAdmin = (dispatch) => async (Cookies) => {
  try {
    dispatch({ type: "IS_ADMIN_LOADING" });
    const res = await apiCall("/isAdmin", "get", null, Cookies.get("token"));
    console.log(res);
    dispatch({ type: "IS_ADMIN_SUCCESS", payload: res.data.isadmin });
    return res;
  } catch (err) {
    return dispatch({ type: "IS_ADMIN_FAILURE" });
  }
};

export const fetchUserList = (dispatch) => async (Cookies) => {
  try {
    dispatch({ type: "FETCH_USER_LIST_LOADING" });
    const res = await apiCall(
      "/fetchUserList",
      "get",
      null,
      Cookies.get("token")
    );
    dispatch({ type: "FETCH_USER_LIST_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    return dispatch({ type: "FETCH_USER_LIST_FAILURE" });
  }
};

export const deleteuser = (dispatch) => async (Cookies, username) => {
  try {
    const res = await apiCall(
      `/deleteuser/${username}`,
      "get",
      null,
      Cookies.get("token")
    );
    console.log(res);
    dispatch({ type: "DELETE_USER_SUCCESS", payload: res.data });
    return res;
  } catch {
    return dispatch({ type: "DELETE_USER_FAILURE" });
  }
};
