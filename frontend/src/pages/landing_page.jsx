import React from 'react';
import SignIn from '../components/signin/sign_in_component';
import SignUp from '../components/signup/sign_up_component';
import './landing_page.css'

class LandingPage extends React.Component {
  constructor(){
    super();
    this.flag = true;
    this.handleButton = this.handleButton.bind(this);
  }


  handleButton(){
    let signin = document.getElementsByClassName('sign-in')
    let signup = document.getElementsByClassName('sign-up')
    let btn = document.getElementsByClassName("form-btn")
    if(this.flag){
        signin[0].style.display = "none";
        signup[0].style.display = "flex";
        btn[0].innerHTML = "Already have an account? Sign In"
        this.flag = false;
    }
    else{
        signin[0].style.display = "flex";
        signup[0].style.display = "none";
        btn[0].innerHTML = " Don't have an account? Sign Up"
        this.flag = true;

    }
}

  render() {

    let btn;
        
    btn =  <div className="form-btn" onClick={this.handleButton}>
    Don't have an account? Sign Up
</div>

    return (
      <div className='landing-page'>
        <div className='landing-page-image-container'>
          <img className='landing-page-image' src="https://app-ecommerce-seeds.s3-us-west-1.amazonaws.com/pngwing.com.png" alt=""/>
        </div>
        <div className='form-div'>
          <SignIn />
          <SignUp/>
          {btn}
        </div>
      </div>
    );
  }
}

export default LandingPage;