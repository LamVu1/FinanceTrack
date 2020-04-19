import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors_reducer';
import transactions from './transactions/transaction_reducer';

const RootReducer = combineReducers({
    session,
    errors,
    transactions
});

export default RootReducer;

