import { RECEIVE_ALL_TRANSACTIONS, 
    RECEIVE_TRANSACTION, 
    REMOVE_TRANSACTION } from './transaction_actions';

const initialState = {
};

export default function(state = initialState, action) {
    let nextState;
  switch (action.type) {
    case RECEIVE_ALL_TRANSACTIONS:
        
        nextState = {...state};
        action.transactions.forEach(transaction=>
            nextState[transaction._id] = transaction
        )
        return nextState;
    case RECEIVE_TRANSACTION:

        nextState = {...state}
        
        nextState[action.transaction._id] = action.transaction
        return nextState;
    case REMOVE_TRANSACTION:
        nextState = Object.assign({}, state);        
        let newState = Object.assign({},Object.values(nextState).filter(t=>t._id !== action.transaction._id))
        return newState;
    default:
      return state;
  }
}