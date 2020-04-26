import React from 'react';
import { connect } from 'react-redux';

import {createTransaction} from '../../reducers/transactions/transaction_actions';
import './transaction_form_component.css';

class TransactionForm extends React.Component{
    constructor(){
        super();
        this.state = {
            item: '',
            amount: '',
            date: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.toggle = true;
    }

    handleUpdate(e){
        let { name, value } = e.target;

        //convert user input to positive
        if(name==='amount'&& value!==''){
            value = Math.abs(value)
        }
        this.setState({ [name]: value });
    }

    handleDate(e){
        this.setState({date: e.target.value})
    }

    handleSubmit(e){
       e.preventDefault();
       let newAmount = this.state.amount
       if(!this.toggle){
         newAmount = newAmount*-1
       }
       const user = Object.assign({}, {...this.state});
       user.amount = newAmount
        if(this.state.date===''){
            delete user.date
        }
        this.setState({item: '', amount:'', date: ''})
       this.props.createTransaction(user)
     }

     handleToggle(e){
         
        //  let btn = document.getElementsByClassName('toggle-income')
        // e.target.classList.add('selected')
        
        if(e.target.innerText==='Income'){
            let btn = document.getElementsByClassName('toggle-spending');
            btn[0].classList.remove('selected');
            e.target.classList.add('selected');
            this.toggle= true;
        }
        if(e.target.innerText==='Spending'){
            let btn = document.getElementsByClassName('toggle-income');
            btn[0].classList.remove('selected');
            e.target.classList.add('selected');
            this.toggle= false;
        }     
     }
    

    render(){

        const {item, amount, date} = this.state;

        return(
            <div className='transaction-form-container'>
                <form action="" className='transaction-form'>

                    <h1 className='transaction-form-header'>Add new transaction</h1>
                   <div className='form-toggle'>
                        <button className='toggle-income selected' onClick={e =>this.handleToggle(e)}>
                            Income
                        </button>
                        <button className='toggle-spending' onClick={e=>this.handleToggle(e)}>
                            Spending
                        </button>
                   </div>
                    <div className='form-item'>
                        <label className='item-label'>Date (If obmitted will default to current date)</label>
                        <input className='item-input' type="date" name="" id="" value={date} title='Default current date' onChange={this.handleDate}/>
                        <label className='item-label' htmlFor="">Item</label>
                            <input className='item-input' type="text" name='item' maxLength={30} value={item} onChange={this.handleUpdate}/>
                        <label htmlFor="" className='item-label' >Amount</label>
                            <input className='item-input' type="number" name='amount' placeholder='Enter Amount' min="0" value={amount} onChange={this.handleUpdate}/>
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