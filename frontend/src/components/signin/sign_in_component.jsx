import { connect } from 'react-redux';
import { login } from '../../reducers/session/session_actions';
import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import './sign_in_component.css'


// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: '',
//       password: '',
//       errors: {}
//     };

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.renderErrors = this.renderErrors.bind(this);
//     this.handleDemo = this.handleDemo.bind(this);

//   }

//   // Once the user has been authenticated, redirect to the Tweets page
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.currentUser === true) {
//       this.props.history.push('/main');
//     }

//     // Set or clear errors
//     this.setState({errors: nextProps.errors})
//   }

//   // Handle field updates (called in the render method)
//   update(field) {
//     return e => this.setState({
//       [field]: e.currentTarget.value
//     });
//   }

//   handleDemo(e){
//     e.preventDefault();
//     let user = {
//       username: 'test1',
//       password: '123456'
//     };
//     this.props.login(user); 

//   }

//   // Handle form submission
//   handleSubmit(e) {
//     e.preventDefault();

//     let user = {
//       username: this.state.username,
//       password: this.state.password
//     };

//     this.props.login(user); 
//   }

//   // Render the session errors if there are any
//   renderErrors() {
//     return(
//       <ul>
//         {Object.keys(this.state.errors).map((error, i) => (
//           <li key={`error-${i}`}>
//             {this.state.errors[error]}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   render() {
//     return (
//       <div className='sign-in'>
//         <h1>Sign In</h1>
//         <form  className='sign-in-form'>
       
//               <input type="text"
//                 value={this.state.username}
//                 onChange={this.update('username')}
//                 placeholder="Username"
//               />
//               <input type="password"
//                 value={this.state.password}
//                 onChange={this.update('password')}
//                 placeholder="Password"
//               />
//           <button className='login-in-btn' onClick={this.handleSubmit} >Submit</button>
//           <button className='demo-login' onClick={this.handleDemo}>Demo Log In</button>
//             {this.renderErrors()}
          
//         </form>
//         <div>
//         </div>
//       </div>
//     );
//   }
// }


const SignIn = ({login})=>{

  let [username, setUserName] = useState('');
  let [password, setPassword] = useState('');

  const update = (e)=>{
    let { name, value } = e.target;
    if(name==='username'){
      setUserName(value)
    }
    if(name==='password'){
      setPassword(value)
    }
  }    
  

  const handleDemo =(e)=>{
    e.preventDefault();
    let user = {
      username: 'test1',
      password: '123456'
    };
    login(user); 
  }


  const handleSubmit=(e)=>{
    e.preventDefault();

    let user = {
      username: username,
      password: password
    };

    login(user); 
  }


  //   renderErrors() {
//     return(
//       <ul>
//         {Object.keys(this.state.errors).map((error, i) => (
//           <li key={`error-${i}`}>
//             {this.state.errors[error]}
//           </li>
//         ))}
//       </ul>
//     );
//   }


  return (
    <div className='sign-in'>
      <h1>Sign In</h1>
      
      <form  className='sign-in-form'>
      
            <input type="text" value={username} name='username' onChange={update} placeholder="Username"/>
            <input type="password" value={password} name='password' onChange={update} placeholder="Password"/>
            <button className='login-in-btn' onClick={handleSubmit} >Submit</button>
            <button className='demo-login' onClick={handleDemo}>Demo Log In</button>
        
      </form>
     
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));