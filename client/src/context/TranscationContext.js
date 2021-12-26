import createDataContext from "./createDataContext";
import transcationreducer from "../reducers/TransactionReducer";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../actions/transaction";

export const intitialState = {
  createExpenseError: "",
  fetchExpenseError: "",
  updateExpenseError: "",
  expense: [],
};

export const { Context, Provider } = createDataContext(
  transcationreducer,
  { getTransactions, addTransaction, deleteTransaction },
  intitialState
);


