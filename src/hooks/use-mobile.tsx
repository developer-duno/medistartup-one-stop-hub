
import * as React from "react"

// Define the mobile breakpoint
const MOBILE_BREAKPOINT = 768

// Custom hook to determine if the current viewport is mobile sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT)

  React.useEffect(() => {
    // Function to update the state based on window width
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value immediately
    updateIsMobile()
    
    // Create media query list for listening to changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Add event listener for when the viewport size changes
    const handleMediaChange = () => updateIsMobile()
    mql.addEventListener("change", handleMediaChange)
    
    // Also listen for resize events as a fallback
    window.addEventListener('resize', updateIsMobile)
    
    // Clean up
    return () => {
      mql.removeEventListener("change", handleMediaChange)
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  return isMobile
}
