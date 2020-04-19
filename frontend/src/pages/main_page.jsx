import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {createTransaction, fetchTransactions, deleteTransaction} from '../reducers/transactions/transaction_actions';
import {Balance} from '../components/balance/balance_component';
import {Transaction} from '../components/transactions/transaction_component';
import TransactionForm from '../components/transaction_form/transaction_form_component';


import './main_page.css'
class MainPage extends React.Component {
  constructor(){
    super();   
    this.handleRemove = this.handleRemove.bind(this);

  }

  componentDidMount(){
    this.props.fetchTransactions(this.props.currentUser)
  }

  // handleToggle(){
  //   this.income = !this.income
  //   console.log(this.income)
  // }

  handleRemove(id){
    this.props.deleteTransaction(id)
  }

  // handleUpdate(e){
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // }


  // handleSubmit(e){
  //    e.preventDefault();
  //   const user = Object.assign({}, this.state);
  //   this.props.createTransaction(user)
  // }
 

  render() {
    
    const {transactions} = this.props;
    let income = 0;
    // let expense = 0;

    let trans = transactions.map(transaction =>{
      income += transaction.amount
      return(
        <Transaction transaction={transaction} remove={this.handleRemove}/>
      )
    })

    

    return (
      <div className='main-page-container'>
        <h1>MAIN PAGE</h1>
        <div>
          <Balance  income={income}/>
        </div>
        <div className='transactions-container'>
          {
            trans
          }
        </div>
        <TransactionForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      currentUser: state.session.user.id,
      transactions: Object.values(state.transactions)
    };
  };
  

  const mapDispatchToProps = (dispatch) => {
    return {
        createTransaction: (data)=>dispatch(createTransaction(data)),
        fetchTransactions: (id)=>dispatch(fetchTransactions(id)),
        deleteTransaction: (id)=>dispatch(deleteTransaction(id))
    };
  };
  
 
 
export default connect(mapStateToProps,mapDispatchToProps)(MainPage);


