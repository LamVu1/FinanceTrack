import React from 'react';
// import { connect } from 'react-redux';
import './income_expense_component.css';

export const IncomeExpense = ({income,expense})=>{

    return(
        <div className='income-expense-container'>
                        
            <div className='income-container'>
                <p className="income-expense-header">INCOME</p>
                <p className="income-amt">${income.toFixed(2)}</p>
            </div>

            <div className='expense-container'>
                <p className="income-expense-header">EXPENSE</p>
                <p className="expense-amt">${Math.abs(expense).toFixed(2)}</p>
            </div>
        </div>
    )
}