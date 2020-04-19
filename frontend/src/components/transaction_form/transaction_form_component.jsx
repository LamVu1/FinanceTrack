import React from 'react';
import { connect } from 'react-redux';

import {createTransaction} from '../../reducers/transactions/transaction_actions';
import './transaction_form_component.css';

class TransactionForm extends React.Component{
    constructor(){
        super();
        this.state = {
            item: '',
            amount: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.toggle = true;
    }

    handleUpdate(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e){
       e.preventDefault();
       let newAmount = this.state.amount
       if(!this.toggle){
         newAmount = newAmount*-1
       }
       const user = Object.assign({}, {...this.state});
       user.amount = newAmount
       console.log(user)
        this.setState({item: '', amount:''})
       this.props.createTransaction(user)
     }

     handleToggle(){
         let btn = document.getElementsByClassName('toggle-income')
         
         if(this.toggle){
            btn[0].innerText = 'Spending';
             this.toggle = false;
             
         }else{
            btn[0].innerText = 'Income';
             this.toggle= true;
         }
     }
    

    render(){

        const {item, amount} = this.state;

        return(
            <div className='transaction-form-container'>
                <form action="" className='transaction-form'>

                    <h1 className='transaction-form-header'>Add new transaction</h1>
                    <button className='toggle-income' onClick={this.handleToggle}>
                        Income
                    </button>
                    <div className='form-item'>
                        <label className='item-label' htmlFor="">Item
                            <input className='item-input' type="text" name='item'  value={item} onChange={this.handleUpdate}/>
                        </label>


                        <label htmlFor="" className='item-label' >Amount
                            <input className='item-input' type="text" name='amount' placeholder='Enter Amount' value={amount} onChange={this.handleUpdate}/>
                        </label>
                    </div>
                    <button className='transaction-form-submit-btn' onClick={this.handleSubmit}>
                        Add transaction
                    </button>      

                </form>
            </div>
        )
    }
}


const mapStateToProps =(dispatch)=>{
    return(
        {createTransaction: (data)=>dispatch(createTransaction(data))
    
        }
    )
}


export default connect(null, mapStateToProps)(TransactionForm);