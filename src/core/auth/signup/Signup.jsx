import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import google from "../../../assets/google.png";
import fb from "../../../assets/fb.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import signupPicture from "../../../assets/thesignupimage.svg";
import styles from "./Signup.module.scss";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
// import Header from "../../../layout/header/Header";
import Navbar from "../../../layout/header/Navbar";
import { login } from "../../../contexts/authContext/apiCalls";
import { AuthContext } from "../../../contexts/authContext/AuthContext";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Signup = () => {
  const clientId = '407472887868-9a6lr7idrip6h8cgthsgekl84mo7358q.apps.googleusercontent.com';

  const [fullName, setFullName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(false);
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateofbirth] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

 const onSuccess = (res) => {
   localStorage.setItem('user',JSON.stringify(res?.profileObj));
   localStorage.setItem('token',res?.tokenId);

   navigate('/dashboard', { replace: true });
 };
 const onFailure = (err) => {
   console.log('failed:', err);
 };

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      fullName.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      password.length < 6 ||
      gender.length == 0 ||
      date_of_birth.length == 0
    ) {
      setError(true);
    }

    //splitting the name into first_name and last_name
    if (fullName) {
      setFirstName(fullName.split(" ")[0]);
      setLastName(fullName.split(" ")[1]);
    }

    try {
      const response = await axios.post(
        "/user",
        { first_name, last_name, email, phone, password, gender, date_of_birth }
      );
      console.log(response);
      login({ email, password }, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  console.log(
    first_name,
    last_name,
    email,
    phone,
    password,
    gender,
    date_of_birth
  );
  /*Later, if you want to, you add/use the default validation by making the input fields and textarea "required". */

  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className={styles.signupContainer}>

        <div className={styles.signupLeft}>
          <h2 className={styles.createAccountText}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.eachContainer}>
              <label htmlFor="first_name" className={styles.describer}>
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="Enter first name"
                value={first_name}
                required
                onChange={e => setFirstName(e.target.value)}
              />
              {error && first_name.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Name does not match!
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.eachContainer}>
              <label htmlFor="last_name" className={styles.describer}>
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Enter last name"
                value={last_name}
                required
                onChange={e => setFullName(e.target.value)}
              />
              {error && fullName.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Name does not match!
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.eachContainer}>
              <label htmlFor="email" className={styles.describer}>
                Email Address
              </label>
              <input
                className={styles.input}
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
              {error && email.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Email does not match!
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.eachContainer}>
              <label htmlFor="phone" className={styles.describer}>
                Phone Number
              </label>
              <PhoneInput
                className={`${styles.phone} ${styles.phoneInputField}`}
                international
                defaultCountry="NG"
                id="phone"
                value={phone}
                required
                onChange={setPhone}
              />

              {error && phone.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Phone number does not match!
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.eachContainer}>
              <label htmlFor="gender" className={styles.describer}>
                Gender
              </label>
              <input
                id="gender"
                className="emailInput"
                type="text"
                placeholder="Enter male or female"
                value={gender}
                required
                onChange={e => setGender(e.target.value)}
              />
            </div>
            <div className={styles.eachContainer}>
              <label htmlFor="date_of_birth" className={styles.describer}>
                Date of birth
              </label>
              <input
                id="date_of_birth"
                className="emailInput"
                type="date"
                placeholder="Enter Date of birth"
                value={date_of_birth}
                required
                onChange={e => setDateofbirth(e.target.value)}
              />
            </div>

            <div className={styles.eachContainer}>
              <label htmlFor="gender" className={styles.describer}>
                Gender
              </label>
              <select name="isSeries" id="gender" value={gender} required className={styles.select} onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {error && gender.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Input a gender!
                </div>
              ) : (
                ""
              )}
            </div>


            <div className={styles.eachContainer}>
              <label htmlFor="date_of_birth" className={styles.describer}>
                Date of birth
              </label>
              <input
                className={styles.input}
                id="date_of_birth"
                type="date"
                placeholder="Enter Date of birth"
                value={date_of_birth}
                required
                onChange={(e) => setDateofbirth(e.target.value)}
              />
              {error && first_name.length <= 0 ? (
                <div className={styles.inputFieldErrorText}>
                  Date of birth cannot be empty!
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.eachContainer}>
              <label htmlFor="password" className={styles.describer}>
                Password
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  id="password"
                  className={styles.passwordInput}
                  type={passwordShown ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <AiOutlineEye
                  onClick={togglePassword}
                  className={passwordShown ? styles.hideEye : styles.showEye}
                />
                <AiOutlineEyeInvisible
                  onClick={togglePassword}
                  className={passwordShown ? styles.showEye : styles.hideEye}
                />
              </div>

              {error && password.length < 6 ? (
                <div className={styles.inputFieldErrorText}>
                  <small>Password must be up to 6 characters!</small>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.permission}>
              <label htmlFor="checkbox"></label>
              <input
                id="checkbox"
                name="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleOnChange}
              />
              <span className={styles.permissionText}>
                By signing up, you agree to the{" "}
                <Link to="/policy" style={{ textDecoration: "none" }}>
                  Terms of service and Privacy Policy
                </Link>
              </span>
            </div>

            {first_name &&
              last_name &&
              email &&
              phone &&
              gender &&
              date_of_birth &&
              password &&
              isChecked && (
                <button id="btn__submit" className={styles.button}>
                  Sign Up
                </button>
              )}
            {(!first_name ||
              !last_name ||
              !email ||
              !phone ||
              !gender ||
              !date_of_birth ||
              !password ||
              !isChecked) && (
                <button
                  id="btn__submit"
                  className={styles.buttonDisabled}
                  disabled
                >
                  Sign Up
                </button>
              )}
          </form>
          <p className={styles.tosignup}>
            Already have an account?,{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                marginLeft: "0.3rem",
                fontWeight: "700"
              }}
            >
              Sign In
            </Link>
          </p>

          <div className={styles.continueWith}>
            <div className={styles.continueWithLine}></div>
            <span className={styles.continueWithText}>Or continue with</span>
            <div className={styles.continueWithLine}></div>
          </div>

          <div className={styles.signupSocials}>
          <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <button onClick={renderProps.onClick} className={styles.signup__googleButton}> <img src={google} alt="google_login" /></button>
          )}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
      />
              <img src={fb} alt="facebook icon" style={{cursor: "pointer"}}/>
          </div>
        </div>

        <div className={styles.signupImg}>
          <img src={signupPicture} alt="signupPicture" />
        </div>

      </div>
    </>
  );
};

export default Signup;
