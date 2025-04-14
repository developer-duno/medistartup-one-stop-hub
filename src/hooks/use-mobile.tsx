
import * as React from "react"

// Define the mobile breakpoint
const MOBILE_BREAKPOINT = 768

// Custom hook to determine if the current viewport is mobile sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to update the state based on window width
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Create media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Add event listener
    mql.addEventListener("change", updateIsMobile)
    
    // Set initial value
    updateIsMobile()
    
    // Clean up
    return () => mql.removeEventListener("change", updateIsMobile)
  }, [])

  // Return true if mobile, false if not, with a fallback to false
  return !!isMobile
}
