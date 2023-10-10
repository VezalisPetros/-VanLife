import React from "react"
import { useLocation, useNavigate, Link  } from "react-router-dom"
import { loginUser } from "../api"


export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [error, setError] = React.useState(null)


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/host";

    

    function handleSubmit(e) {
        e.preventDefault()
        
        loginUser(loginFormData)
            .then(id => {
                
                localStorage.setItem("loggedin", true)
                localStorage.setItem("idLogged",id)
                navigate(from, { replace: true }) 
                
            })
            .catch(err => {
                setError(err)
            })

            
          
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {location.state?.message && (
                <div className="login-first">
                    <span className="material-symbols-outlined">
                        error
                    </span>
                    <h3>{location.state.message}</h3>
                </div>
            )}

            <h1>Log in to your account</h1>
            {
                error?.message &&
                <h3 className="login-first">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Email:</h2>
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Type your Email"
                    value={loginFormData.email}
                />
                <h2>Password:</h2>
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Type your password"
                    value={loginFormData.password}
                />
                <button className="vibrate-1">Log in</button>
            </form>
            <div className="sign-up">
                    <div>Not have an account? </div>
                <Link to="../signUp" className="sign-up-link">Sign up here</Link>
                </div>
        </div>
    )
}
