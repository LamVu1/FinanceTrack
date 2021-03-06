import React, {useState} from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {fetchTransactionsFiltered, fetchTransactions} from '../../reducers/transactions/transaction_actions';
import './filter_component.css'


// class Filters extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       start_date: '',
//       end_date: ''
//     }
//    this.filter = this.filter.bind(this);
//    this.handleDate = this.handleDate.bind(this);
//    this.removefilter = this.removefilter.bind(this);

//   }

//   filter(e){
//     e.preventDefault()
//     let date 
//     if(this.state.end_date===''){
//       date = {id:this.props.currentUser ,start_date: new Date(this.state.start_date), end_date: new Date()}

//     }else{
//      date = {id:this.props.currentUser ,start_date: new Date(this.state.start_date), end_date: new Date(this.state.end_date)}
//     }
//     this.props.fetchTransactionsFiltered(date)
//   }

//   removefilter(){
//     this.setState({start_date: '', end_date:''})
//     this.props.fetchTransactions(this.props.currentUser)
//   }

//   handleDate(e){
//     let { name, value } = e.target;
//     this.setState({ [name]: value });

//   }

//   render() {
//     let {start_date, end_date} = this.state
    
//       return (
        // <div className='filter-container'>
        //     <form className='filter-form'>                
        //         <label>
        //           From:
        //           <input type="date" name="start_date" value={start_date} onChange={this.handleDate}/>
        //         </label>
                
        //         <label>
        //           To:
        //           <input type="date" name="end_date" value={end_date} onChange={this.handleDate}/>
        //         </label>
              
        //         <button className='filter-btn' onClick={this.filter}>Filter</button>
        //         <button className='remove-filter-btn' onClick={this.removefilter}>X</button>
            
        //     </form>
        // </div>
//       );
//     }
//   }


const Filters = ({currentUser, fetchTransactionsFiltered, fetchTransactions})=>{

  let [start_date, setStartDate] = useState('');
  let [end_date, setEndDate] = useState('');

  
  const handleDate = (e)=>{
    let { name, value } = e.target;
    if(name==='start_date'){
      setStartDate(value)
    }
    if(name==='end_date'){
      setEndDate(value)
    }
  }

  const  filter= (e)=>{
    e.preventDefault()
    let date 
    if(end_date===''){
      date = {id: currentUser ,start_date: new Date(start_date), end_date: new Date()}

    }else{
     date = {id: currentUser ,start_date: new Date(start_date), end_date: new Date(end_date)}
    }
    fetchTransactionsFiltered(date)
  }


  const  removefilter=()=>{
    setStartDate('');
    setEndDate('')
    fetchTransactions( currentUser)
  }

  return(
    <div className='filter-container'>
      <form className='filter-form'>  
        
        <div className='filter-form-container'>
          <div className='filter-form-div'>

              <div>
              <label className='filter-label'>
              From
              </label>
              <input className='filter-input' type="date" name="start_date" value={start_date} onChange={handleDate}/>
              </div>   

              <div>
                <label className='filter-label'>
                To
                </label>
                <input className='filter-input' type="date" name="end_date" value={end_date} onChange={handleDate}/>
                </div> 
                
          </div>
        </div>

        <div className='filter-btn-container'>
          <button className='filter-btn' onClick={filter}>Filter</button>
          <button className='remove-filter-btn' onClick={removefilter}>X</button>
        </div>

      </form>
</div>
  )
}

const mapStateToProps = (state) => {
  
  return {
    currentUser: state.session.user.id,
  };
};


const mapDispatchToProps = dispatch=>{
  return({
    fetchTransactionsFiltered: (dates)=>dispatch(fetchTransactionsFiltered(dates)),
    fetchTransactions: (id)=>dispatch(fetchTransactions(id))

  })
}


export default connect(mapStateToProps,mapDispatchToProps)(Filters);