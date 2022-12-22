import { viewWithThreshholds } from "@core/definitions";
import { isNextAuthDisabled } from "@core/routing";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export const FrameType = {
    PC: 'pc',
    PAD: 'pad',
    MOBILE: 'mobile'
}
export const useNextAuthDisabled = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const { back } = useRouter()
    useEffect(() => {
        if (isNextAuthDisabled())
            back()
    }, [back])
}