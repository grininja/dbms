import createDataContext from "./createDataContext";
import AdminReducer from "../reducers/AdminReducer";
import { isAdmin, fetchUserList,deleteuser } from "../actions/admin";

export const initialState = {
  isAdmin: false,
  userList: [],
};

export const { Context, Provider } = createDataContext(
  AdminReducer,
  { isAdmin, fetchUserList,deleteuser},
  initialState
);
