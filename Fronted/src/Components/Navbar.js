import React, { useState,useEffect,useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link ,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };
  const alanBtnRef = useRef({}).current;
  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "fce0da505ce14c698334c1606c801d872e956eca572e1d8b807a3e2338fdd0dc/stage",
    });
  }, []);

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/")
  }

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Health <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
          
        </li>
       

       
        
      </ul>
      <button onClick={() => {
        alanBtnRef.btnInstance.setVisualState({ data: 'your data' });
      }}></button>

      <button
        className="navbar-btn "
        type="button"
     
      >
        {(!localStorage.getItem("authToken"))?
          <Link to="/login" className="navbar-links" >
            Login
          </Link>
          :
          <div className='btn bg-white text-danger mx-2 ' onClick={handleLogout}>Logout</div>
        }
      
    
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
          <li>
        {(!localStorage.getItem("authToken"))?
          <Link to="/login" className="navbar-links">
            Login
          </Link>
          :
          <div className='btn bg-white text-danger mx-2 ' onClick={handleLogout}>Logout</div>
        }
        </li>
    
        </ul>
       
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
