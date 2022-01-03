import apiCall from "../apiCall";

export const getBudget = (dispatch) => async (Cookies) => {
  try {
    const response = await apiCall(
      "/userbudget",
      "get",
      null,
      Cookies.get("token")
    );

    dispatch({ type: "GET_BUDGET_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_BUDGET_FAILURE" });
  }
};

export const setbudget = (dispatch) => async (amount, Cookies) => {
  try {
    const response = await apiCall(
      "/updateuserbudget",
      "put",
      amount,
      Cookies.get("token")
    );
    dispatch({ type: "SET_BUDGET_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "SET_BUDGET_FAILURE" });
  }
};

export const getTransactions = (dispatch) => async (Cookies) => {
  try {
    dispatch({ type: "GET_TRANSACTIONS_LOADING" });
    const { data } = await apiCall(
      "/getTransactions",
      "get",
      null,
      Cookies.get("token")
    );

    dispatch({ type: "GET_TRANSACTIONS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_TRANSACTIONS_FAILURE" });
    console.log(error);
  }
};

export const deleteTransaction = (dispatch) => async (id, Cookies) => {
  try {
    dispatch({ type: "DELETE_TRANSACTION_LOADING" });
    await apiCall(
      `/deleteTransaction/${id}`,
      "delete",
      null,
      Cookies.get("token")
    );
    dispatch({ type: "DELETE_TRANSACTION_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_TRANSACTION_FAILURE" });
    console.log(error);
  }
};

export const addTransaction = (dispatch) => async (transaction, Cookies) => {
  try {
    dispatch({ type: "ADD_TRANSACTION_LOADING" });
    const { data } = await apiCall(
      "/addTransaction",
      "post",
      transaction,
      Cookies.get("token")
    );

    dispatch({ type: "ADD_TRANSACTION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_TRANSACTION_FAILURE" });
    console.log(error);
  }
};
