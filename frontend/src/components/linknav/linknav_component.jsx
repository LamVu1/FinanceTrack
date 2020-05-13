import React from 'react';
import './linknav_component.css'

const LinkNav = ()=>{
    
    return(
    
    <div className="NAV-BAR">
        <a href="https://www.linkedin.com/in/lam-vu-4b49a5117/" target="_blank">
        <img className='link-img' src="linkedin-brands.svg" alt=""/>
        </a>
        <a href="https://github.com/LamVu1/FinanceTrack" target="_blank">
        <img className='link-img' src="github-brands.svg" alt=""/>
        </a>
        <a href="https  ://angel.co/lam-vu-2" target="_blank">
        <img className='link-img' src="angellist-brands.svg" alt=""/>
        </a>     
    </div>

    )
}

export default LinkNav
