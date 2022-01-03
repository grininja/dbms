import React, { useContext, useState } from "react";
import { Context as BudgetContext } from "../../context/BudgetContext";
import Cookie from "js-cookie";
const AddExpenseForm = (props) => {
  const { addTransaction } = useContext(BudgetContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      text: name,
      amount: cost,
    };

    addTransaction(expense, Cookie);

    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div class="row">
        <div class="col-sm col-lg-4">
          <label for="name">Name</label>
          <input
            required="required"
            type="text"
            class="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="text"
          />
        </div>
        <div class="col-sm col-lg-4">
          <label for="cost">Cost</label>
          <input
            required="required"
            type="number"
            class="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            name="amount"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
