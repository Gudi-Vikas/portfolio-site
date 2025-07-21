import React, { useState, useRef } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Mobile menu toggle
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className='navbar-container'>
      {/* Desktop Navbar */}
      <div className='navbar-desktop'>
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
      {/* Mobile Navbar */}
      <div className='navbar-mobile'>
        <button className='menu-btn' onClick={toggleMobileMenu} aria-label='Open menu'>
          <span className='menu-icon' />
        </button>
        {mobileMenuOpen && (
          <div className='mobile-menu-overlay' onClick={closeMobileMenu}>
            <nav className='mobile-menu' onClick={e => e.stopPropagation()}>
              <button className='close-menu-btn' onClick={closeMobileMenu} aria-label='Close menu'>×</button>
              <ul>
                {NAV_LINKS.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} onClick={closeMobileMenu} className='mobile-menu-link'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
