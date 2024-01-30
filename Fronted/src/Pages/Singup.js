import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'

import './Login.css';

const Login = () => {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",number:""})

    let navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const response = await fetch("http://localhost:8000/singup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          number: credentials.number,
        }),
      });
    
      const json = await response.json();
    
      if (response.ok) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log("Signup successful");
        navigate("/");
        
      } else {
        console.error(json.message || "Signup failed");
        alert("Signup failed. Please check your credentials.");
      }
    };
    
const onChange =(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={handleSubmit} className="login">
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <input type="text" className="login__input" name='name'value={credentials.name} onChange={onChange} placeholder="User name" />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input type="password" name='password' value={credentials.password} onChange={onChange}  className="login__input" placeholder="Password" />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input  className="login__input" name='number' value={credentials.number}onChange={onChange} placeholder="Number" />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input type="email" className="login__input" name='email' value={credentials.email} onChange={onChange} placeholder="email" />
            </div>
            <button className="button login__submit">
              <span className="button__text">Singup now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </button>
            
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
