import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider as BudgetProvider } from "../context/BudgetContext";
import Budget from "../components/Budget/Budget";
import ExpenseTotal from "../components/Budget/ExpenseTotal";
import ExpenseList from "../components/Budget/ExpenseList";
import AddExpenseForm from "../components/Budget/AddExpenseForm";
import RemainingBudget from "../components/Budget/Remaining";
import BudgetNavbar from './BudgetNavbar'
const Expense = () => {
  return (
    <BudgetProvider>
      <BudgetNavbar/>
      <div className="container">
        <h1 className="mt-3">My Budget Planner</h1>
        <div className="row mt-3">
          <div className="col-sm">
            <Budget />
          </div>
          <div className="col-sm">
            <RemainingBudget />
          </div>
          <div className="col-sm">
            <ExpenseTotal />
          </div>
        </div>
        <h3 className="mt-3">Expenses</h3>
        <div className="row ">
          <div className="col-sm">
            <ExpenseList />
          </div>
        </div>
        <h3 className="mt-3">Add Expense</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </BudgetProvider>
  );
};

export default Expense;
