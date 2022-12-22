import { isNextAuthDisabled } from "@core/routing"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function () {
    const { back } = useRouter()
    useEffect(() => {
        if (isNextAuthDisabled())
            back()
    }, [back])
    return (<div>
        signin
    </div>)
}