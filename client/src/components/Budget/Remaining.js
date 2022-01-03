import React, { useContext } from 'react';
import { Context as BudgetContext } from '../../context/BudgetContext';

const RemainingBudget = () => {
	const {state } = useContext(BudgetContext);

	const totalExpenses = state.expense.reduce((total, item) => {
		return (total += item.amount);
	}, 0);

	const alertType = totalExpenses > state.budget ? 'alert-danger' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
			<span>Remaining: Rs{state.budget - totalExpenses}</span>
		</div>
	);
};

export default RemainingBudget;
