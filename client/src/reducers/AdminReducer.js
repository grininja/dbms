import { initialState } from "../context/AdminContext";

const admin = (state = initialState, action) => {
  switch (action.type) {
    case "IS_ADMIN_LOADING":
      return { ...state };
    case "IS_ADMIN_SUCCESS":
      return { ...state, isAdmin: action.payload };
    case "IS_ADMIN_FAILURE":
      return { ...state };
    case "FETCH_USER_LIST_LOADING":
      return { ...state };
    case "FETCH_USER_LIST_SUCCESS":
      return { ...state, userList: action.payload };
    case "FETCH_USER_LIST_FAILURE":
      return { ...state };
    case "DELETE_USER_SUCCESS":
      return {...state}
    case "DELETE_USER_FAILURE":
      return {...state}
  }
};

export default admin;