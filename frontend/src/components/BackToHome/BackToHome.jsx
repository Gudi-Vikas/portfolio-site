import React from 'react'
import './BackToHome.css'

/**
 * BackToHome renders a button that navigates back in browser history.
 */
const BackToHome = () => (
  <div className='back-container'>
    <button className='back-button' onClick={() => window.history.back()}>
      <svg viewBox='0 0 24 24'>
        <polyline points='15 6 9 12 15 18' />
      </svg>
    </button>
  </div>
)

export default BackToHome
