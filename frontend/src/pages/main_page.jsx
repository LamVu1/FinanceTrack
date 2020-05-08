import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {createTransaction, fetchTransactions, deleteTransaction} from '../reducers/transactions/transaction_actions';
import {Balance} from '../components/balance/balance_component';
import {Transaction} from '../components/transactions/transaction_component';
import TransactionForm from '../components/transaction_form/transaction_form_component';
import {IncomeExpense} from '../components/income_expense/income_expense_component';
import {LineGraph} from '../components/linegraph/line_graph_component';
// import {BarGraph} from '../components/bargraph/bar_graph_component';
import Filters from '../components/filters/filter_component';
import SearchBox from '../components/search/search_component';

import './main_page.css'
class MainPage extends React.Component {
  constructor(){
    super();   
    this.state = {
      search: ''
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);


  }

  componentDidMount(){
    this.props.fetchTransactions(this.props.currentUser)
  }

  handleRemove(id){
    this.props.deleteTransaction(id)
  }

  handleSearch(e){
    e.preventDefault();
    this.setState({search: e.target.value}) 
}



  render() {
    
    const {transactions} = this.props;



    // let transactions = this.props.transactions.filter((ele)=> ele.text.toLowerCase().includes(this.state.search.toLowerCase()))

    let income = 0;
    let expense = 0;

    let trans = transactions.map(transaction =>{
      if(transaction.amount >0){
        income+=transaction.amount
      }
      else if(transaction.amount < 0){
        expense+=transaction.amount
      }
      return(
        <Transaction transaction={transaction} remove={this.handleRemove}/>
      )
    })
//     <div className='search-div'>
//     <form className='search-form'>
//         <input onChange={this.handleSearch} type="text" name="" value={this.state.search} placeholder='Search'/>
      
//     </form>
// </div>
    

    return (
      <div className='main-page-container'>
        <div className="left-container">
          <Balance  income={income} expense={expense}/>
          <IncomeExpense income={income} expense={expense}/>
          <div className='search-filter'>
    <SearchBox />
         
          <Filters />
          </div>
        <div className='transactions-container'>
          {
            trans
          }
        </div>
        <TransactionForm />


        </div>
        <div className='right-container'>
        <LineGraph />
        </div>

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


