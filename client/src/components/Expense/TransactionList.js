import React, { useContext, useEffect } from "react";
import { Transaction } from "./Transaction";
import Cookie from "js-cookie";
import {
  Context as TranscationContext,
  Provider as TranscationProvider,
} from "../../context/TranscationContext";

export const TransactionList = () => {
  const { state, getTransactions } = useContext(TranscationContext);
  const [transactions,setTransactions] = React.useState([]);
  useEffect(() => {
    getTransactions(Cookie);
    // setTransactions(state.expense);
  }, [state.expense]);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {state.expense.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
