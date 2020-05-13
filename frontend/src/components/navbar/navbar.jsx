// src/components/nav/navbar_container.js
import React from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../../reducers/session/session_actions';
import './navbar.css'
// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.logoutUser = this.logoutUser.bind(this);
//     this.getLinks = this.getLinks.bind(this);
//   }

//   logoutUser(e) {
//       e.preventDefault();
//       this.props.logout();
//   }

//   // Selectively render links dependent on whether the user is logged in
//   getLinks() {
//       if (this.props.loggedIn) {
//         return (
            
//                 <button className='logout-btn' onClick={this.logoutUser}>Logout</button>
            
//         );
//       } else {
//         return (
//             null
//         );
//       }
//   }

//   render() {
//       return (
//         <div className='nav-bar'>
//           <div className='logo-container'>
//           <img className='nav-logo' src="img.png" alt=""/>
//             <h1>FinanceTracks</h1>
//           </div>
//             { this.getLinks() }
//         </div>
//       );
//   }
// }


const NavBar =({logout, loggedIn}) => {
 

  const logoutUser =(e)=>{
      e.preventDefault();
      logout();
  }

  // Selectively render links dependent on whether the user is logged in
  const getLinks =()=>{
      if (loggedIn) {
        return (
                <button className='logout-btn' onClick={logoutUser}>Logout</button>
        );
      } else {
        return (
            null
        );
      }
  }

  return (
    <div className='nav-bar'>
      <div className='logo-container'>
      <img className='nav-logo' src="img.png" alt=""/>
        <h1>FinanceTracks</h1>
      </div>
        {getLinks()}
    </div>
  );

}


const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

// const mapDispatchToProps = dispatch => ({
//   logout: ()=>dispatch(logout)
// });

export default connect(mapStateToProps,{logout})(NavBar);