import React from 'react';
import { connect } from 'react-redux';
import './transaction_component.css';

export const Transaction =({transaction, remove})=>{
    
    let sign='';
    if(transaction.amount<0){
        sign = '-'
    }else{
        sign='+'
    }
    return(
        <div key={transaction._id} className='transaction-item'>
            <button className='transaction-del-btn' onClick={()=>{
              remove(transaction._id)
            }}>X</button>
                <div  key={transaction._id} className={(sign==='-' ?'t-minus' :'t-plus')}>
                <div className='transaction-text'>{transaction.text}</div>
                <div className='transaction-amount'>{sign}${Math.abs(transaction.amount).toFixed(2)}</div>
            </div>
        </div>
    )
}

