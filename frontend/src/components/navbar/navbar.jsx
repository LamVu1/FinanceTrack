// src/components/nav/navbar_container.js
import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../../reducers/session/session_actions';
import './navbar.css'
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            
                <button className='logout-btn' onClick={this.logoutUser}>Logout</button>
            
        );
      } else {
        return (
            null
        );
      }
  }

  render() {
      return (
        <div className='nav-bar'>
            <h1>FinanceTracker</h1>
            { this.getLinks() }
        </div>
      );
  }
}


const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);