import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const useNextSessionAuthenticated = () => {
    const { push } = useRouter()
    const session = useSession()
    useEffect(() => {
        if (session.status === 'authenticated')
            push('/')
    }, [session.status])
}