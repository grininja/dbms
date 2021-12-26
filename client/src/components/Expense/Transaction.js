import React, {useContext} from 'react';
import { numberWithCommas } from '../../utils/format';
import Cookie from 'js-cookie';
import {
  Context as TranscationContext,
  Provider as TranscationProvider,
} from "../../context/TranscationContext";
export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(TranscationContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}Rs{numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={() => deleteTransaction(transaction.id,Cookie)} className="delete-btn">x</button>
    </li>
  )
}
