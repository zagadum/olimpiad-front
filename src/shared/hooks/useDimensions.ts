import { useEffect, useState } from 'react'
import { useUserOS } from "./useUserOS";
import { isMobile, isTablet } from 'react-device-detect';

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    viewportHeight: 0,
    isMobile: false,
    isTablet: false,
    keyboardHeight: 0
  })

  const os = useUserOS()

  useEffect(() => {
    function handleResize() {
      const viewportHeight = window.visualViewport?.height || 0;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;
      setDimensions({
        width: windowWidth,
        height: windowHeight,
        viewportHeight: viewportHeight,
        isMobile: isMobile || windowWidth < 768,
        isTablet: isTablet || (os === 'ios' || os === 'android') || (windowWidth >= 768 && windowWidth <= 1024),
        keyboardHeight: heightDiff > 0 ? heightDiff : 0
      })
    }
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, [])

  return dimensions
}
