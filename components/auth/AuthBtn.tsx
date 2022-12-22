import { isNextAuthDisabled } from "@core/routing"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
export default function AuthBtn() {
    const { data: session } = useSession()
    if (isNextAuthDisabled())
        return (<></>)
    if (session && session.user) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}