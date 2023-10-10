import React from "react"
import {  NavLink ,useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();

    
    
    function fakeLogOut() {
        localStorage.removeItem("loggedin");
        navigate('/');
      }
    
    
    return (
     
        <nav>
           <NavLink to="/" 
                className='home-link'
                
                >#VANLIFE</NavLink>

           <div className="side-links">

           <NavLink 
                    to="host"
                     className={({isActive}) => isActive ? "active-link" : null}
                >
                    Host </NavLink>

            <NavLink to="about"
                 className={({isActive}) => isActive ? "active-link" : null}
                 >About</NavLink>
            <NavLink to="vans"
                 className={({isActive}) => isActive ? "active-link" : null}
                >Vans</NavLink>
            <NavLink to="login" className="login-link">
                <span class="material-symbols-outlined">
                    passkey
                </span>
            </NavLink>
            <NavLink>
                <span class="material-symbols-outlined vibrate-1 icons" onClick={fakeLogOut}>
                    logout
                </span>
            </NavLink>
            
            </div>
        </nav>
    )
}