import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

interface UserRole {
    id: number
    userId: string
    role: Role
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string,
        accessToken: string | undefined,
        roles: UserRole[]
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string | undefined,
        user: {
            /** The user's postal address. */
            id: any
            roles: UserRole[]
        } & DefaultSession["user"]
    }
    interface User {
        roles: UserRole[]
    }
}