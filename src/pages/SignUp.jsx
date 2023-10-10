import React from 'react'

import {  Link, useLocation , useNavigate } from "react-router-dom"
import { createUser } from "../api"

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = React.useState({ email: "", password: "" ,name:"" })
  const [error, setError] = React.useState(null)

  

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/host";

  function handleChange(e) {
    const { name, value } = e.target
    setSignUpFormData(prev => ({
        ...prev,
        [name]: value
    }))
}


  function handleSubmit(e) {
    e.preventDefault()
    
  
    createUser(signUpFormData)
    .then(data => {
                
      localStorage.setItem("loggedin", true)
      navigate(from, { replace: true }) // use the replace  so if you go back the login page will not saw
      
  })
  .catch(err => {
      setError(err)
  })

  setIdLoggedIn(id);
  console.log(idLoggedIn)

      
}
  return (
    
      <div className="login-container">
      <h1>Sign up</h1>
            {
                error?.message &&
                <h3 className="error-message">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Name:</h2>
                    <input
                        name="name"
                        onChange={handleChange}
                        type="name"
                        placeholder="Type your Name"
                        value={signUpFormData.name}
                    />
                <h2>Email:</h2>
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Type your Email"
                    value={signUpFormData.email}
                />
                <h2>Password:</h2>
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Type your password"
                    value={signUpFormData.password}
                />
                <button className="vibrate-1">Sign Up</button>
            </form>
            <div className="sign-up">
                    <div>Already have an account? </div>
                <Link to="../login" className="sign-up-link">Login here</Link>
                </div>
    </div>
      
        
  )
}

export default SignUp
