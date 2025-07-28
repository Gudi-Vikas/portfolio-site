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
      // Check for low-end devices (but allow mobile)
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 || // 2 or fewer CPU cores
        navigator.deviceMemory <= 2 // 2GB or less RAM
        // Removed mobile device detection to allow Spline on mobile

      setIsLowEndDevice(isLowEnd)

      // Check for slow connections
      if ('connection' in navigator) {
        const connection = navigator.connection
        const isSlow = 
          connection.effectiveType === 'slow-2g' ||
          connection.effectiveType === '2g' ||
          connection.downlink < 1.0 // Less than 1.0 Mbps

        setIsSlowConnection(isSlow)
      }

      // Determine if we should load Spline (allow on mobile)
      const shouldLoad = !isLowEnd && !isSlowConnection
      setShouldLoadSpline(shouldLoad)

      // Set appropriate load time based on device capabilities
      if (isLowEnd || isSlowConnection) {
        setSplineLoadTime(1500) // Faster for low-end devices
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
