/* eslint-disable default-case */
import BudgetReducer from "../reducers/BudgetReducer";
import createDataContext from "./createDataContext";
import {
  deleteTransaction,
  getBudget,
  setbudget,
  getTransactions,
  addTransaction,
} from "../actions/transaction";

export const intitialState = {
  loading: true,
  error: "",
  budget:0,
  expense: [],
};

export const { Context, Provider } = createDataContext(
  BudgetReducer,
  { deleteTransaction, getBudget, setbudget, getTransactions, addTransaction },
  intitialState
);
