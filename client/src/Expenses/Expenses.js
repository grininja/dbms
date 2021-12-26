import React from "react";
import { Header } from "../components/Expense/Header";
import { Balance } from "../components/Expense/Balance";
import { IncomeExpenses } from "../components/Expense/IncomeExpenses";
import { TransactionList } from "../components/Expense/TransactionList";
import { AddTransaction } from "../components/Expense/AddTransaction";
import {
  Context as TranscationContext,
  Provider as TranscationProvider,
} from "../context/TranscationContext";


import "./Expense.css";

function Expense() {
  return (
    <TranscationProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </TranscationProvider>
  );
}

export default Expense;
