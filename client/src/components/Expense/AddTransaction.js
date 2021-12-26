import React, { useState, useContext } from "react";
import {
  Context as TranscationContext,
  Provider as TranscationProvider,
} from "../../context/TranscationContext";
import Cookie from "js-cookie";
export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(TranscationContext);


  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      text: text,
      amount: +amount,
    };

    addTransaction(newTransaction, Cookie);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            name="text"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
