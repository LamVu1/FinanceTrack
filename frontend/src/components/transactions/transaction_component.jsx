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
        <div key={transaction._id} className={'transaction-item' + (sign==='-' ?'-minus' :'-plus')}>
            <button className='transaction-del-btn' onClick={()=>{
              remove(transaction._id)
            }}>X</button>
            <h1>{transaction.text}</h1>
            <h3>{sign}${Math.abs(transaction.amount)}</h3>
        </div>
    )
}

