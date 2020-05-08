import { RECEIVE_ALL_TRANSACTIONS, 
    RECEIVE_TRANSACTION, 
    REMOVE_TRANSACTION, RECEIVE_SEARCH_TRANSACTIONS } from './transaction_actions';

const initialState = {
};

export default function(state = initialState, action) {
    let nextState;
  switch (action.type) {
    case RECEIVE_ALL_TRANSACTIONS:
        
        // nextState = {...state};
        // action.transactions.forEach(transaction=>
        //     nextState[transaction._id] = transaction
        // )

        nextState = {...action.transactions}
        return nextState;
    case RECEIVE_TRANSACTION:

        nextState = {...state}
        
        nextState[action.transaction._id] = action.transaction
        
        nextState = Object.values(nextState).sort((a,b)=>new Date(b.date)-new Date(a.date))

        return nextState;
    case REMOVE_TRANSACTION:
        nextState = Object.assign({}, state);        
        let newState = Object.assign({},Object.values(nextState).filter(t=>t._id !== action.transaction._id))
        return newState;
    case  RECEIVE_SEARCH_TRANSACTIONS:
        nextState = Object.assign({}, state);  
        let searchState = Object.assign({},Object.values(nextState).filter(t=>t.text.toLowerCase().includes(action.search.toLowerCase())))
        return searchState;
    default:
      return state;
  }
}

