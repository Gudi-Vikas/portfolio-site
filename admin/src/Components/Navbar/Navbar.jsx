import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='navbar'>
      <div className='nav-left'>
        <p className='app-title'>Admin Panel</p>
      </div>
      <div className='nav-right'>
        <div className='nav-actions'>
          <button className='nav-btn'>Preview</button>
          <button className='nav-btn logout-btn' onClick={handleLogout}>Logout</button>
        </div>
        <img className='profile' src={assets.profile_image} alt='profile' />
      </div>
    </div>
  )
}

export default Navbar
