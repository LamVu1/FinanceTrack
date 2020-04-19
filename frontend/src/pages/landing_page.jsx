import React from 'react';
import SignIn from '../components/signin/sign_in_component';
import SignUp from '../components/signup/sign_up_component';
import '../components/signinup.css'

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
        btn[0].innerHTML = "Have an account already? Sign In"
        this.flag = false;
    }
    else{
        signin[0].style.display = "flex";
        signup[0].style.display = "none";
        btn[0].innerHTML = " New to myshop? Sign Up"
        this.flag = true;

    }
}

  render() {

    let btn;
        
    btn =  <div className="form-btn" onClick={this.handleButton}>
    New to myshop? Sign Up
</div>

    return (
      <div>
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