import { useState } from "react";
import { SpinnerCircular } from 'spinners-react';
import { addUser, checkIfEmailExists } from "../services/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {

  const navigate = useNavigate()
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

  const handleSubmit = ()=>{
    let tempError = {
      password: '',
      fullName:'',
      phone:'',
      address:'',
    }
    let hasError = false
    if(user.password.trim()===''){
      tempError.password = "Password cannot be Empty"
      hasError = true
    }
    if(user.fullName.trim()===''){
      tempError.fullName = "Name cannot be Empty"
      hasError = true
    }
    if(user.phone.trim()===''){
      tempError.phone = "Phone cannot be Empty"
      hasError = true
    }
    if(user.address.trim()===''){
      tempError.address = "Address cannot be Empty"
      hasError = true
    }

    if(hasError){
      setError(tempError)
    }else{
      addUser(user).then(
        (response)=>{
          if(response){
            toast.success("Successfully Signed In")
            navigate('/')
          }
        }
      ).catch((error)=>{
        toast.error("failed Signing Up, Error: "+error)
      })
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
                  <input type="email" placeholder="Email" name="email" onChange={handleChange} value={user.email}/>
                  <input type="button" value="Next" className="primary-btn" onClick={emailCheck}/>
                </div>
              </>
              )
            }

            {
              step ==="details" && (
                <div id="detailsStep">
                  <span className="error" id="errorMsg" style={{ color: "red" }}>{error.fullName}</span>
                  <input type="text" placeholder="Full Name" name="fullName" onChange={handleChange} value={user.fullName}/>
                  <span className="error" id="errorMsg" style={{ color: "red" }}>{error.phone}</span>
                  <input type="text" placeholder="Phone" name="phone" onChange={handleChange} value={user.phone}/>
                  <span className="error" id="errorMsg" style={{ color: "red" }}>{error.address}</span>
                  <input type="text" placeholder="Address" name="address" onChange={handleChange} value={user.address}/>
                  <span className="error" id="errorMsg" style={{ color: "red" }}>{error.password}</span>
                  <input type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password}/>

                  <div className="button-group">
                    <button type="button" className="back-icon-btn" onClick={()=> setStep("email")}>
                      <FontAwesomeIcon icon={faArrowLeft} /> 
                    </button>
                    <input type="button" value="Sign Up" className="primary-btn" onClick={handleSubmit}/>
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
