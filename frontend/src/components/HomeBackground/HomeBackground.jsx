import React, { useState, useEffect, Suspense, lazy } from 'react'
import './HomeBackground.css'

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'))

const HomeBackground = () => {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)
  const [splineLoadTime, setSplineLoadTime] = useState(0)
  const [splineError, setSplineError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [forceLoad, setForceLoad] = useState(false)

  useEffect(() => {
    // Check device capabilities
    const checkDeviceCapabilities = () => {
      console.log('🔍 Checking device capabilities...')
      
      // Enhanced mobile detection - less restrictive
      const isMobile = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 
        window.innerWidth <= 768
      
      // Check for very low-end devices - more lenient
      const isVeryLowEnd = 
        navigator.hardwareConcurrency <= 2 || // 2 or fewer CPU cores (was 1)
        (navigator.deviceMemory && navigator.deviceMemory <= 2) // 2GB or less RAM (was 1GB)

      setIsLowEndDevice(isVeryLowEnd)

      // Check for very slow connections - more lenient
      let isVerySlow = false
      if ('connection' in navigator) {
        const connection = navigator.connection
        isVerySlow = 
          connection.effectiveType === 'slow-2g' ||
          (connection.effectiveType === '2g' && connection.downlink < 0.5) // Only 2g with very slow speed

        setIsSlowConnection(isVerySlow)
      }

      // More permissive loading conditions
      const shouldLoad = !isMobile && !isVeryLowEnd && !isVerySlow
      
      console.log('📱 Device Info:', {
        userAgent: navigator.userAgent,
        isMobile,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink
        } : 'Not available',
        shouldLoad
      })
      
      setShouldLoadSpline(shouldLoad)

      // Set appropriate load time based on device capabilities
      if (isMobile || isVeryLowEnd || isVerySlow) {
        setSplineLoadTime(1000) // Very fast for mobile and low-end devices
      } else {
        setSplineLoadTime(2000) // Normal load time
      }
      
      setIsLoading(false)
    }

    // Check immediately
    checkDeviceCapabilities()

    // Check again after a short delay to allow for network detection
    const timer = setTimeout(checkDeviceCapabilities, 1000)

    // Add resize listener to handle orientation changes
    const handleResize = () => {
      checkDeviceCapabilities()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle Spline loading errors
  const handleSplineError = (error) => {
    console.error('❌ Spline loading error:', error)
    setSplineError(error)
    setShouldLoadSpline(false)
  }

  // Handle Spline load success
  const handleSplineLoad = () => {
    console.log('✅ Spline loaded successfully!')
    setSplineError(null)
  }

  // Force load Spline (for debugging)
  const handleForceLoad = () => {
    console.log('🚀 Force loading Spline...')
    setForceLoad(true)
    setShouldLoadSpline(true)
    setSplineError(null)
  }

  // Fallback component for when Spline is not loaded
  const SplineFallback = () => (
    <div className="spline-fallback">
      <div className="fallback-content">
        <div className="fallback-animation"></div>
        {splineError && (
          <div className="error-message">
            <p>Spline failed to load</p>
            <small>Check console for details</small>
            <button onClick={handleForceLoad} className="force-load-btn">
              Force Load Spline
            </button>
          </div>
        )}
        {!splineError && !shouldLoadSpline && (
          <div className="error-message">
            <p>Spline disabled for this device</p>
            <button onClick={handleForceLoad} className="force-load-btn">
              Force Load Anyway
            </button>
          </div>
        )}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className='background'>
        <SplineFallback />
      </div>
    )
  }

  return (
    <div className='background'>
      {shouldLoadSpline || forceLoad ? (
        <Suspense fallback={<SplineFallback />}>
          <Spline 
            className='robot' 
            scene='https://prod.spline.design/or8xG0ZnrxkblGyp/scene.splinecode'
            renderOnDemand={true}
            onError={handleSplineError}
            onLoad={handleSplineLoad}
          />
        </Suspense>
      ) : (
        <SplineFallback />
      )}
    </div>
  )
}

export default HomeBackground
