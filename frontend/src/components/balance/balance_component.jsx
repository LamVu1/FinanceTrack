import React from 'react';

export const Balance = ({income})=>{
    console.log(income)
    return(
        <div>
            <h1>
            BALANCE    
            </h1>
            ${income}
        </div>
    )
}


