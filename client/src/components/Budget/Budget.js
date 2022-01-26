import React, { useState, useContext, useEffect } from "react";
import ViewBudget from "./ViewBudget";
import EditBudget from "./EditBudget";
import { Context as BudgetContext } from "../../context/BudgetContext";
import Cookie from "js-cookie";
const Budget = () => {
  const { getBudget, setbudget, state } = useContext(BudgetContext);

  const [isEditing, setIsEditing] = useState(false);
  const [budgetval, setBudgetval] = useState(state.budget);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    getBudget(Cookie);
    setBudgetval(state.budget);
  }, [state.budget]);

  const handleSaveClick = async (value) => {
    const data = {
      budget: value,
    };
    if (!Number.isInteger(value) || (Number.isInteger(value) && value < 0)) {
      alert("Please enter a valid positive budget");
      return;
    }
    await setbudget(data, Cookie);

    setIsEditing(false);
  };

  return (
    <div class="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <EditBudget handleSaveClick={handleSaveClick} budget={budgetval} />
      ) : (
        // For part 1 render component inline rather than create a seperate one
        <ViewBudget handleEditClick={handleEditClick} budget={budgetval} />
      )}
    </div>
  );
};

export default Budget;
