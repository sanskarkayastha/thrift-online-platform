import { useState } from "react";
import { logUserIn } from "../services/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = ({ setIsRightPanelActive }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.trim() && password.trim()){
      logUserIn(email,password).then((response)=>{
        if(response.data.length>0){
          localStorage.setItem("authToken", response.data.id);
          toast.success("Signed in successfully");
          navigate("/",{replace:true});
        } else { setError("Incorrect Credentials"); }
      })
    } else { setError("Fields Cannot be Empty"); }
  }

  return (
    <form id="loginForm">
      <h1>Sign In</h1>
      <span id="loginError" className="error">{error}</span>
      <input type="email" placeholder="Email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <p onClick={()=>setIsRightPanelActive(true)} style={{cursor:"pointer"}}>Forgot your password?</p>
      <button onClick={handleSubmit}>Sign In</button>
    </form>
  );
};

export default Login;
