import { useRouter } from "next/router";
import { useEffect } from "react"

export const useAsPAthChanged = (callbak:Function) => {
    const { locale, locales, asPath, push } = useRouter();
    useEffect(() => {
        callbak()
    }, [asPath])
}