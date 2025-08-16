const SignUp = () => {
  return (
    <form id="signUpForm">
      <h1>Create Account</h1>
      <span className="error" id="errorMsg" style={{ color: "red" }}></span>

      <div id="emailStep">
        <input type="email" placeholder="Email" name="email" required />
        <input type="button" value="Next" className="primary-btn" />
      </div>

      <div id="otpStep" style={{ display: "none" }}>
        <span className="error" id="otpErrorMsg" style={{ color: "red" }}></span>
        <input type="text" placeholder="Enter OTP" name="otp" required />
        <input type="button" value="Verify OTP" className="primary-btn" />
      </div>

      <div id="detailsStep" style={{ display: "none" }}>
        <input type="text" placeholder="First Name" name="firstName" required />
        <input type="text" placeholder="Last Name" name="lastName" required />
        <input type="text" placeholder="Phone Number" name="phoneNumber" required />
        <input type="password" placeholder="Password" name="password" required />

        <div className="button-group">
          <button type="button" className="back-icon-btn">
            <i className="fas fa-arrow-left"></i>
          </button>
          <input type="submit" value="Sign Up" className="primary-btn" />
        </div>
      </div>
    </form>
  );
};

export default SignUp;
