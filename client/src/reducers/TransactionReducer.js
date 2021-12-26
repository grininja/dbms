import { intitialState } from "../context/TranscationContext";

const transaction = (state = intitialState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_LOADING":
      return { ...state, loading: true, error: "" };
    case "GET_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        expense: action.payload,
      };
    case "GET_TRANSACTIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TRANSACTION_LOADING":
      return { ...state, loading: true, error: "" };
    case "ADD_TRANSACTION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        expense: [...state.expense, action.payload],
      };
    case "ADD_TRANSACTION_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_TRANSACTION_LOADING":
      return { ...state, loading: true, error: "" };
    case "DELETE_TRANSACTION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        expense: state.expense.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "DELETE_TRANSACTION_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transaction;
