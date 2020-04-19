import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import {createTransaction, fetchTransactions, deleteTransaction} from '../reducers/transactions/transaction_actions';
import {Balance} from '../components/balance/balance_component';

class MainPage extends React.Component {
  constructor(){
    super();
    this.state = {
        item: '',
        amount: 0
      };
    this.income = true;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

  }

  componentDidMount(){
    this.props.fetchTransactions(this.props.currentUser)
  }

  handleToggle(){
    this.income = !this.income
    console.log(this.income)
  }

  handleDelete(id){
    this.props.deleteTransaction(id)
  }

  handleUpdate(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleSubmit(e){
     e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.createTransaction(user)
  }
 

  render() {
    const {item, amount} = this.state;
    
    const {transactions} = this.props;
    let income = 0;
    // let expense = 0;

    let trans = transactions.map(transaction =>{
      income += transaction.amount
      return(
        <li key={transaction._id}>
          <h1>{transaction.text}</h1>
          <h3>{transaction.amount}</h3>
          <button onClick={()=>{this.handleDelete(transaction._id)}}>Delete</button>
        </li>
      )
    })

    

    return (
      <div>
        <h1>MAIN PAGE</h1>
        <div>
          <Balance  income={income}/>
        </div>
        <ul>
        {
          trans
        }
        </ul>
        <form action="">
            <h1>Add new transaction</h1>
            <label htmlFor="">Item
            <input type="text" name='item' placeholder='Enter Item' value={item} onChange={this.handleUpdate}/>
            </label>
            <button onClick={this.handleToggle}>Toggle</button>
            <label htmlFor="">Amount
            <input type="text" name='amount' placeholder='Enter Amount' value={amount} onChange={this.handleUpdate}/>
            </label>
            <button onClick={this.handleSubmit}>Submit</button>      
        </form>
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
  
 
 
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage);


