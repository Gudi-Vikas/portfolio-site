import React, { useState, useEffect } from 'react'
import './SplineDebugger.css'

const SplineDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const gatherDebugInfo = () => {
      const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
        onLine: navigator.onLine,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        } : 'Not available',
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          availWidth: window.screen.availWidth,
          availHeight: window.screen.availHeight
        },
        window: {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight
        },
        timestamp: new Date().toISOString()
      }
      
      setDebugInfo(info)
    }

    gatherDebugInfo()
    
    // Update on resize
    const handleResize = () => gatherDebugInfo()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleVisibility = () => setIsVisible(!isVisible)

  const testSplineScene = async () => {
    try {
      const response = await fetch('https://prod.spline.design/or8xG0ZnrxkblGyp/scene.splinecode', {
        method: 'HEAD'
      })
      alert(`Spline scene test: ${response.status} ${response.statusText}`)
    } catch (error) {
      alert(`Spline scene test failed: ${error.message}`)
    }
  }

  if (!isVisible) {
    return (
      <button 
        className="debug-toggle"
        onClick={toggleVisibility}
        title="Toggle Spline Debugger"
      >
        🐛
      </button>
    )
  }

  return (
    <div className="spline-debugger">
      <div className="debug-header">
        <h3>Spline Debugger</h3>
        <button onClick={toggleVisibility}>×</button>
      </div>
      
      <div className="debug-content">
        <button onClick={testSplineScene} className="test-button">
          Test Spline Scene URL
        </button>
        
        <div className="debug-section">
          <h4>Device Information</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
        
        <div className="debug-section">
          <h4>Recommendations</h4>
          <ul>
            <li>Check browser console for errors</li>
            <li>Ensure stable internet connection</li>
            <li>Try disabling browser extensions</li>
            <li>Check if Spline scene URL is accessible</li>
            <li>Verify browser supports WebGL</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SplineDebugger
