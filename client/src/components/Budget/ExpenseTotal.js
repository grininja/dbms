import React, { useContext } from 'react';
import { Context as BudgetContext } from '../../context/BudgetContext';

const ExpenseTotal = () => {
	const { state } = useContext(BudgetContext);

	const total = state.expense.reduce((total, item) => {
		return (total += item.amount);
	}, 0);

	return (
		<div class='alert alert-primary p-4'>
			<span>Spent so far: Rs{total}</span>
		</div>
	);
};

export default ExpenseTotal;
