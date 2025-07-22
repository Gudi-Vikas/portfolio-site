import React, { useState, useRef } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const hideTimeout = useRef();

  //show popup
  const handleEnter = () => {
    clearTimeout(hideTimeout.current);
    setShowPopup(true);
  };
  // Hide popup 
  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => setShowPopup(false), 120);
  };

  return (
    <div className='navbar-container'>
      <Link to='/'>
        <button className='nav-button top-left'>HOME</button>
      </Link>
      <div
        className='profile-container'
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button className='nav-button top-right'>PROFILE</button>
        <div className={`side-popup${showPopup ? ' show' : ''}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Link to='/skills'>
            <button className='popup-option'>SKILLS</button>
          </Link>
          <br />
          <Link to='/projects'>
            <button className='popup-option'>PROJECTS</button>
          </Link>
        </div>
      </div>
      <Link to='/about'>
        <button className='nav-button bottom-left'>ABOUT</button>
      </Link>
      <Link to='/contact'>
        <button className='nav-button bottom-right'>CONTACT ME</button>
      </Link>
    </div>
  );
};

export default Navbar;
