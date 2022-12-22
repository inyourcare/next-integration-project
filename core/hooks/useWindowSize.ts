import { viewWithThreshholds } from "@core/definitions";
import { useEffect, useState } from "react"

export const FrameType = {
    PC: 'pc',
    PAD: 'pad',
    MOBILE: 'mobile'
}
export const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined,
    });
    const [frameType,setFrameType] = useState(FrameType.PC)
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to 
            const w = (window.innerWidth > 0) ? window.innerWidth : screen.width
            const h = (window.innerHeight > 0) ? window.innerHeight : screen.height
            setWindowSize({
                // width: window.innerWidth,
                width: w,
                // height: window.innerHeight,
                height: h,
            });
            // if (window.matchMedia("(max-width: 400px)").matches)
            //     console.log('match')
            // if (w > 768)
            if (w > viewWithThreshholds.PC)
                setFrameType(FrameType.PC)
            // else if (w > 360)
            else if (w > viewWithThreshholds.PAD)
                setFrameType(FrameType.PAD)
            else 
                setFrameType(FrameType.MOBILE)
  
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return {
        windowSize,
        frameType
        // onAcceptCookies: acceptCookies,
    }
}