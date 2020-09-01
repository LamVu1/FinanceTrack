import React from 'react';
import './balance_component.css'

export const Balance = ({income, expense})=>{
    let balance = income + expense;
    let sign='';
    if(balance<0){
        sign = '-'
    }
    return(
        <div className='balance-container'>
            <div>
            BALANCE    
            </div>
            <div>
    ${sign}{balance.toFixed(2)}

            </div>
        </div>
    )
}


