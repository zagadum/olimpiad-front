import { useEffect, useState } from 'react'

export const useUserOS = (): string => {
  const [os, setOS] = useState('unknown')

  useEffect(() => {
    const detectOS = () => {
      const userAgent = navigator.userAgent

      if (/Windows/.test(userAgent)) return 'windows'
      if (/Mac/.test(userAgent)) return 'macos'
      if (/Android/.test(userAgent)) return 'android'
      if (/iPhone|iPad|iPod/.test(userAgent)) return 'ios'
      if (/Linux/.test(userAgent)) return 'linux'

      return 'unknown'
    }

    setOS(detectOS())
  }, [])

  return os
}
