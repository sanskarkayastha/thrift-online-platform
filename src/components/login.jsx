import { useState } from "react"
import { authToken, logUserIn } from "../services/auth"
import { useNavigate } from "react-router"
import { toast } from "react-toastify";

const Login = ()=>{

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    let token = authToken

    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email.trim() != '' && password.trim() != ''){
            logUserIn(email,password).then((response)=>{
                if(response.data.length>0){
                    localStorage.setItem("authToken",token)
                    localStorage.setItem("userId", response.data.id)
                    toast.success("Signned in sucessfully ")
                    navigate("/home",{replace:true})
                }else{
                    setError("Incorrect Credentials")
                }
            })
        }else{
            setError("Fields Cannot be Empty")
        }
        
    }

    return(
        <form id="loginForm">
            <h1>Sign in</h1>
            <span id="loginSuccess" style={{ color: "green" }}></span>
            <span id="loginError" style={{ color: "red" }}>{error}</span>

            <input type="email" placeholder="Email" name="email" required  onChange={handleEmailChange}/>
            <input type="password" placeholder="Password" name="password" required onChange={handlePasswordChange} />

            <p>Forgot your password?</p>
            <button id="signInButton" onClick={handleSubmit}>Sign In</button>
        </form>
    )
}

export default Login