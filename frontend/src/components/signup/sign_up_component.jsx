import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../reducers/session/session_actions';
import './sign_up_component.css'


// class SignUp extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         username: '',
//         password: '',
//         password2: '',
//         errors: {}
//       };
  
//       this.handleSubmit = this.handleSubmit.bind(this);
//       this.clearedErrors = false;
//     }
  
//     componentWillReceiveProps(nextProps) {
//       if (nextProps.signedIn === true) {
//         this.props.history.push('/main');
//       }
  
//       this.setState({errors: nextProps.errors})
//     }
  
//     update(field) {
//       return e => this.setState({
//         [field]: e.currentTarget.value
//       });
//     }
  
//     handleSubmit(e) {
//       e.preventDefault();
//       let user = {
//         username: this.state.username,
//         password: this.state.password,
//         password2: this.state.password2
//       };
  
//       this.props.signup(user, this.props.history); 
//     }
  
//     renderErrors() {
//       return(
//         <ul>
//           {Object.keys(this.state.errors).map((error, i) => (
//             <li key={`error-${i}`}>
//               {this.state.errors[error]}
//             </li>
//           ))}
//         </ul>
//       );
//     }
  
//     render() {
//       return (
//         <div className="sign-up">
//            <h1>Sign Up</h1>
//           <form>
//             <div className="sign-up-form">
             
//                 <input type="text"
//                   value={this.state.username}
//                   onChange={this.update('username')}
//                   placeholder="Username"
//                 />
//                 <input type="password"
//                   value={this.state.password}
//                   onChange={this.update('password')}
//                   placeholder="Password"
//                 />
//                 <input type="password"
//                   value={this.state.password2}
//                   onChange={this.update('password2')}
//                   placeholder="Confirm Password"
//                 />
//               <button className='signup-btn' onClick={this.handleSubmit}>
//                 Submit
//               </button>
//               {this.renderErrors()}
//             </div>
//           </form>
//         </div>
//       );
//     }
//   }
  

const SignUp = ({history, signup})=> {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [password2, setPassword2] = useState('');
  
  
  const update =(e)=>{
    
    if(e.currentTarget.name === 'username'){
      setUsername(e.currentTarget.value)
    }
    if(e.currentTarget.name === 'password'){
      setPassword(e.currentTarget.value)
    }
    if(e.currentTarget.name === 'password2'){
      setPassword2(e.currentTarget.value)
    }
    }
  
   const handleSubmit = (e)=>{
      e.preventDefault();
      let user = {
        username: username,
        password: password,
        password2: password2
      };
  
      signup(user, history); 
    }
  
    return (
      <div className="sign-up">
          <h1>Sign Up</h1>
          <form>
            <div className="sign-up-form">
              
                <input type="text" value={username} name ='username' onChange={update} placeholder="Username"/>
                <input type="password" value={password} name ='password' onChange={update} placeholder="Password"/>
                <input type="password" value={password2} name = 'password2' onChange={update} placeholder="Confirm Password"/>
                <button className='signup-btn' onClick={handleSubmit}>Submit</button>
              
            </div>
          </form>
      </div>
    ); 
  }
  

const mapStateToProps = (state) => {

  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };

};

const mapDispatchToProps = (dispatch) => {

  return {
    signup: user => dispatch(signup(user))
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));