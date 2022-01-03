import React, { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import {Context as BudgetContext } from "../../context/BudgetContext";
import Cookie from "js-cookie";
const ExpenseList = () => {
  const { state,getTransactions } = useContext(BudgetContext);

  const [filteredExpenses, setfilteredExpenses] = useState(
    state.expense || []
  );

  useEffect(() => {
    (async () => {
      await getTransactions(Cookie);
    })();
    
    setfilteredExpenses(state.expense);
  }, [state.expense.length]);

  const handleChange = (event) => {
    const searchResults = state.expense.filter((filteredExpense) =>
      filteredExpense.text.toLowerCase().includes(event.target.value)
    );
    setfilteredExpenses(searchResults);
  };

  return (
    <>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleChange}
      />
      <ul class="list-group mt-3 mb-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            id={expense.id}
            name={expense.text}
            cost={expense.amount}
          />
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
