import { isNextAuthDisabled } from "@core/routing";
import { useRouter } from "next/router";
import { useEffect } from "react"

export const useNextAuthDisabled = () => {
    const { back } = useRouter()
    useEffect(() => {
        if (isNextAuthDisabled())
            back()
    }, [back])
}