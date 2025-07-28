import React, { useState, useEffect, Suspense, lazy } from 'react'
import './HomeBackground.css'

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'))

const HomeBackground = () => {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)
  const [splineLoadTime, setSplineLoadTime] = useState(0)

  useEffect(() => {
    // Check device capabilities
    const checkDeviceCapabilities = () => {
      // Check for mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
      
      // Check for very low-end devices
      const isVeryLowEnd = 
        navigator.hardwareConcurrency <= 1 || // 1 or fewer CPU cores
        navigator.deviceMemory <= 1 // 1GB or less RAM

      setIsLowEndDevice(isVeryLowEnd)

      // Check for very slow connections
      let isVerySlow = false
      if ('connection' in navigator) {
        const connection = navigator.connection
        isVerySlow = 
          connection.effectiveType === 'slow-2g' ||
          connection.effectiveType === '2g' ||
          connection.downlink < 0.5 // Less than 0.5 Mbps

        setIsSlowConnection(isVerySlow)
      }

      // Determine if we should load Spline (disable on mobile and low-end devices)
      const shouldLoad = !isMobile && !isVeryLowEnd && !isVerySlow
      setShouldLoadSpline(shouldLoad)

      // Set appropriate load time based on device capabilities
      if (isMobile || isVeryLowEnd || isVerySlow) {
        setSplineLoadTime(1000) // Very fast for mobile and low-end devices
      } else {
        setSplineLoadTime(2000) // Normal load time
      }
    }

    // Check immediately
    checkDeviceCapabilities()

    // Check again after a short delay to allow for network detection
    const timer = setTimeout(checkDeviceCapabilities, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Fallback component for when Spline is not loaded
  const SplineFallback = () => (
    <div className="spline-fallback">
      <div className="fallback-content">
        <div className="fallback-animation"></div>
      </div>
    </div>
  )

  return (
    <div className='background'>
      {shouldLoadSpline ? (
        <Suspense fallback={<SplineFallback />}>
          <Spline 
            className='robot' 
            scene='https://prod.spline.design/or8xG0ZnrxkblGyp/scene.splinecode'
            renderOnDemand={true}
          />
        </Suspense>
      ) : (
        <SplineFallback />
      )}
    </div>
  )
}

export default HomeBackground
