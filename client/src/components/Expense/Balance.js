import React, { useContext } from "react";
// import { GlobalContext } from '../../context/GlobalState';
import { numberWithCommas } from "../../utils/format";
import {
  Context as TranscationContext,
  Provider as TranscationProvider,
} from "../../context/TranscationContext";
export const Balance = () => {
  // const { transactions } = useContext(GlobalContext);
  const { state } = useContext(TranscationContext);
  const transactions = state.expense;
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>Rs{numberWithCommas(total)}</h1>
    </>
  );
};
