import {React, useLayoutEffect, useState} from "react"
import "../Css/Auth.css"
import Login from "../components/login"
import SignUp from "../components/signup"
import { useLocation, useNavigate } from "react-router"


const AuthContainer = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(
    ()=>{
      if(location.state?.tab ==='login'){
        setIsRightPanelActive(false)
        navigate(location.pathname,{replace:true, state:null})
      }
    },[location,navigate]
  )
  

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <SignUp/>
      </div>

      <div className="form-container sign-in-container">
        <Login/>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer;
