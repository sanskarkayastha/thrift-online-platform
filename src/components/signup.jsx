import { useState } from "react";
import { SpinnerCircular } from 'spinners-react';
import { checkIfEmailExists } from "../services/user";

const SignUp = () => {

  const [step,setStep] = useState("email")
  const [user,setUser] = useState({
    email: '',
    password: '',
    fullName:'',
    phone:'',
    address:'',
  })
  const [emailError, setEmailError] = useState()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState({
    password: '',
    fullName:'',
    phone:'',
    address:'',
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setUser(
      {
        ...user,
        [name]:value,
      }
    )
  }

  const emailCheck = ()=>{
    setLoading(true)
    if(user.email === ''){
      setEmailError("Email cannot be Empty")
      setLoading(false)
    }else{
      checkIfEmailExists(user.email).then(
        (response)=>{
          console.log(response)
          if(response){
            setEmailError("Email already exists")
            setLoading(false)
          }else{
            setLoading(false)
            setStep("details")
          }
        }
      )
    }
  }

  const checkUserData = ()=>{
    let tempError = {
      password: '',
      fullName:'',
      phone:'',
      address:'',
    }
  }

  return (
    <form id="signUpForm">
      <SpinnerCircular enabled={loading}/>
      {
        !loading &&
        (
          <>
            {step ==="email" && (
              <>
                <h1>Create Account</h1>
                <span className="error" id="errorMsg" style={{ color: "red" }}>{emailError}</span>
                <div id="emailStep">
                  <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                  <input type="button" value="Next" className="primary-btn" onClick={emailCheck}/>
                </div>
              </>
              )
            }

            {
              step ==="details" && (
                <div id="detailsStep">
                  <input type="text" placeholder="Full Name" name="fullName"/>
                  <input type="text" placeholder="Phone" name="phone"/>
                  <input type="text" placeholder="Address" name="address"/>
                  <input type="password" placeholder="Password" name="password"/>

                  <div className="button-group">
                    <button type="button" className="back-icon-btn">
                      <i className="fas fa-arrow-left"></i>
                    </button>
                    <input type="button" value="Sign Up" className="primary-btn" />
                  </div>
                </div>
              )
            }
            
          </>
        )
      }
    </form>
  );
};

export default SignUp;
