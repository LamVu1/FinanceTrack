import React, {useState} from 'react';
import {connect} from 'react-redux';
import './search_component.css';

import {receiveSearchTransactions, fetchTransactions} from '../../reducers/transactions/transaction_actions';

// class SearchBox extends React.Component{
//     constructor(){
//         super()
//         this.state={
//             search:''
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.clearSearch = this.clearSearch.bind(this);


//     }

//     handleChange(e){
//         this.setState({search: e.target.value})
//     }

//     handleSubmit(e){
//         e.preventDefault()
//         this.props.receiveSearchTransactions(this.state.search)
//     }

//     clearSearch(){
//         this.setState({search: ''})
//         this.props.fetchTransactions(this.props.currentUser)
//     }

//     render(){
//         let search = this.state.search
//         return(
//             <div className='search-container'>
//                 <form className='search-form'>
//                     <input type="text" placeholder='Search' value={search} onChange={this.handleChange}/>
//                     <button className='filter-btn' onClick={this.handleSubmit}>Filter</button>
//                     <button className='remove-filter-btn' onClick={this.clearSearch}>X</button>
//                 </form>
//             </div>
//         )
//     }
// }

const SearchBox = ({currentUser, receiveSearchTransactions,fetchTransactions})=>{
    let [search, setSearch] = useState('');


    const handleChange =(e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        receiveSearchTransactions(search)
    }

    const clearSearch =()=>{
        setSearch('')
        fetchTransactions(currentUser)
    }


    return(
            <div className='search-container'>
                <form className='search-form'>
                    <div className='search-form-container'>
                    <input className='search-input' type="text" placeholder='Search' value={search} onChange={handleChange}/>
                    </div>
                    <div className='filter-btn-container'>

                    <button className='filter-btn' onClick={handleSubmit}>Filter</button>
                    <button className='remove-filter-btn' onClick={clearSearch}>X</button>
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


const mapDispatchToProps = dispatch =>{
    return(
       { receiveSearchTransactions: (search)=> dispatch(receiveSearchTransactions(search)),
        fetchTransactions: (id)=>dispatch(fetchTransactions(id))
}
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchBox)