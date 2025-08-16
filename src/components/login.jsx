const Login = ()=>{
    return(
        <form id="loginForm">
            <h1>Sign in</h1>
            <span id="loginSuccess" style={{ color: "green" }}></span>
            <span id="loginError" style={{ color: "red" }}></span>

            <input type="email" placeholder="Email" name="email" required />
            <input type="password" placeholder="Password" name="password" required />

            <a>Forgot your password?</a>
            <button id="signInButton">Sign In</button>
        </form>
    )
}

export default Login