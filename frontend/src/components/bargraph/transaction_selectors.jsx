import { createSelector } from 'reselect'

export const transactionSelector = state => {
    

    // let nextState = Object.assign({}, state);        
    //  let newState = Object.values(state.transactions).map(t=>t.amount)
    let newState = Object.values(state.transactions)

    return newState
}


// export const testSelector = createSelector(
//     transactionSelector)