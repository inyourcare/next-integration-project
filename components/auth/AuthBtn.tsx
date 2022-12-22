import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
export default function AuthBtn() {
    const { data: session } = useSession()
    if (process.env.NEXT_PUBLIC_NEXTAUTH === 'disable')
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