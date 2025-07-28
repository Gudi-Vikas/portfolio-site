import React, { useState, useRef } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='navbar-container'>
      {/* Desktop Navigation */}
      <div className="desktop-nav">
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

      {/* Mobile Navigation */} 
      <div className="mobile-nav">
        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                <span>×</span>
              </button>
            </div>
            
            <nav className="mobile-menu-nav">
              <Link to='/' onClick={closeMobileMenu} className="mobile-menu-item">
                <span className="mobile-menu-icon">🏠</span>
                <span className="mobile-menu-text">Home</span>
              </Link>
              
              <Link to='/skills' onClick={closeMobileMenu} className="mobile-menu-item">
                <span className="mobile-menu-icon">⚡</span>
                <span className="mobile-menu-text">Skills</span>
              </Link>
              
              <Link to='/projects' onClick={closeMobileMenu} className="mobile-menu-item">
                <span className="mobile-menu-icon">💼</span>
                <span className="mobile-menu-text">Projects</span>
              </Link>
              
              <Link to='/about' onClick={closeMobileMenu} className="mobile-menu-item">
                <span className="mobile-menu-icon">👤</span>
                <span className="mobile-menu-text">About</span>
              </Link>
              
              <Link to='/contact' onClick={closeMobileMenu} className="mobile-menu-item">
                <span className="mobile-menu-icon">📧</span>
                <span className="mobile-menu-text">Contact</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
