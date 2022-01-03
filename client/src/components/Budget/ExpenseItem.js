import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import {Context as BudgetContext } from '../../context/BudgetContext';
import Cookies from 'js-cookie';
const ExpenseItem = (props) => {
	const {deleteTransaction  } = useContext(BudgetContext);

	const handleDeleteExpense = () => {
		deleteTransaction(props.id, Cookies);
	};

	return (
		<li class='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				<span class='badge badge-primary badge-pill mr-3'>Rs{props.cost}</span>
				<TiDelete size='1.5em' onClick={handleDeleteExpense} />
			</div>
		</li>
	);
};

export default ExpenseItem;
