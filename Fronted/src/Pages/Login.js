import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import Singup from './Singup';


const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginError, setLoginError] = useState('');
  
const [loginMessage, setloginMessage] = useState('');

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const loginData = {
    email,
    password
  };

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      localStorage.setItem("userEmail", loginData.email);
      console.log(localStorage.getItem("userEmail"));

      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
      console.log("Successful Login !");
    } else {
      setLoginError('Invalid credentials');
      console.log('Login failed:', loginError);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
};


  // const onChange = (event) => {
  //   setCredentials({ ...credentials, [event.target.name]: event.target.value });
  // };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <input type="text" className="login__input" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder=" Email" />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input type="password" className="login__input" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </button>
            <Link to='/singup' className="button login__submit">
              <span className="button__text">Signup now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </Link>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
