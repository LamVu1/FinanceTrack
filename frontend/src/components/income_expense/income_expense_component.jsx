import React from 'react';
// import { connect } from 'react-redux';
import './income_expense_component.css';

export const IncomeExpense = ({income,expense})=>{

    return(
        <div className='income-expense-container'>
                        
            <div className='income-container'>
                <div className="income-expense-header">INCOME</div>
                <div className="income-amt">${income.toFixed(2)}</div>
            </div>

            <div className='expense-container'>
                <div className="income-expense-header">EXPENSE</div>
                <div className="expense-amt">${Math.abs(expense).toFixed(2)}</div>
            </div>
        </div>
    )
}