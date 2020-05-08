import * as APIUtil from './transactions_api_util';
// import jwt_decode from 'jwt-decode';


export const RECEIVE_ALL_TRANSACTIONS = "RECEIVE_ALL_TRANSACTIONS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";
export const RECEIVE_SEARCH_TRANSACTIONS = "RECEIVE_SEARCH_TRANSACTIONS";


// We'll dispatch this when our user signs in
export const receiveAllTransactions = transactions => ({
    type: RECEIVE_ALL_TRANSACTIONS,
    transactions: transactions
});

export const receiveTransaction = transaction => ({
    type: RECEIVE_TRANSACTION,
    transaction
});

export const removeTransaction = transaction => ({
    type: REMOVE_TRANSACTION,
    transaction
});

export const receiveSearchTransactions = search => ({
    type: RECEIVE_SEARCH_TRANSACTIONS,
    search: search
});




export const createTransaction = userData => dispatch => {
    return(
    APIUtil.createTransaction(userData).then((transaction) => {
        dispatch(receiveTransaction(transaction.data))
    }
    ))
};

export const fetchTransactions = (userData)=>dispatch=>{
    return(
        APIUtil.fetchTransactions   (userData).then((transactions)=>{
            dispatch(receiveAllTransactions(transactions.data))
        })
    )
}

export const fetchTransactionsFiltered = (filterDate)=>dispatch=>{
    return(
        APIUtil.fetchTransactionsFiltered(filterDate).then((transactions)=>{
            dispatch(receiveAllTransactions(transactions.data))
        })
    )
}


export const deleteTransaction = (id)=>dispatch => {
    
    return(
        APIUtil.deleteTransaction(id).then(transaction =>
            dispatch(removeTransaction(transaction.data))
        )
    )
}