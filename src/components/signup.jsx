import { useState } from "react";
import { addUser, checkIfEmailExists } from "../services/user";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SignUp = ({ setIsRightPanelActive }) => {
  const navigate = useNavigate();
  const [step,setStep] = useState("email");
  const [emailError,setEmailError] = useState('');
  const [user,setUser] = useState({ email:'', password:'', fullName:'', phone:'', address:'' });
  const [error,setError] = useState({ password:'', fullName:'', phone:'', address:'' });

  const handleChange = (e) => setUser({...user,[e.target.name]: e.target.value});

  const emailCheck = () => {
    if(!user.email){ setEmailError("Email cannot be Empty"); }
    else {
      checkIfEmailExists(user.email).then(res=>{
        if(res){ setEmailError("Email already exists"); }
        else { setStep("details"); }
      })
    }
  }

  const handleSubmit = () => {
    let tempError = {password:'', fullName:'', phone:'', address:''};
    let hasError=false;
    if(!user.password){ tempError.password="Password cannot be Empty"; hasError=true; }
    if(!user.fullName){ tempError.fullName="Name cannot be Empty"; hasError=true; }
    if(!user.phone){ tempError.phone="Phone cannot be Empty"; hasError=true; }
    if(!user.address){ tempError.address="Address cannot be Empty"; hasError=true; }

    if(hasError){ setError(tempError); }
    else {
      addUser(user).then(res=>{
        toast.success("Successfully Signed Up");
        setStep("email"); setUser({ email:'', password:'', fullName:'', phone:'', address:'' });
        navigate('/', { replace:true, state:{ tab:'login' } });
      }).catch(err => toast.error("Failed Signing Up: "+err));
    }
  }

  return (
    <form id="signUpForm">
      {step==="email" && (
        <>
          <h1>Create Account</h1>
          <span id="errorMsg" className="error">{emailError}</span>
          <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
          <input type="button" value="Next" onClick={emailCheck} />
        </>
      )}
      {step==="details" && (
        <div>
          <span id="errorMsg">{error.fullName}</span>
          <input type="text" placeholder="Full Name" name="fullName" value={user.fullName} onChange={handleChange}/>
          <span id="errorMsg">{error.phone}</span>
          <input type="text" placeholder="Phone" name="phone" value={user.phone} onChange={handleChange}/>
          <span id="errorMsg">{error.address}</span>
          <input type="text" placeholder="Address" name="address" value={user.address} onChange={handleChange}/>
          <span id="errorMsg">{error.password}</span>
          <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange}/>

          <div className="button-group">
            <button type="button" className="back-icon-btn" onClick={()=>setStep("email")}>
              <FontAwesomeIcon icon={faArrowLeft}/> Back
            </button>
            <input type="button" value="Sign Up" onClick={handleSubmit}/>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUp;
