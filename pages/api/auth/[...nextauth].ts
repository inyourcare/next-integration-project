import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@custdatabase/prisma'
import { logger } from "@core/logger";
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                logger.debug('authorize start')
                // logger.debug('authorize', { credentials })
                const res = await fetch(`${process.env.NEXTAPI_BASE_URL}/user/check-credentials`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                }).catch((e) => {
                    logger.debug('authorize error', e)
                    throw Error(e)
                })
                // logger.debug('authorize res', { res })
                const user = await res.json()
                logger.debug('authorize ends with::', user)
                // If no error and we have user data, return it
                if (res.ok && user) {
                    logger.debug('res ok')
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    // adapter: PrismaAdapter(prisma),
    callbacks: {
        // async redirect({ url, baseUrl }: {url: string,baseUrl: string}) {
        //     logger.debug("redirect callback", url, baseUrl)
        //     // Allows relative callback URLs
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        // },
        async jwt({ token, user, account, profile, isNewUser }) {
            // Persist the OAuth access_token to the token right after signin
            logger.debug("jwt callback")
            if (account) {
                token.accessToken = account.access_token
            }
            const userRole = user?.roles;
            if (userRole) token.roles = userRole
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            logger.debug("session callback")
            session.accessToken = token.accessToken
            const userRole = token.roles;
            const userId = token.sub
            if (userRole) session.user.roles = userRole;
            if (userId) session.user.id = userId
            logger.debug("session callback ends width", session.user.id, session.user.roles)
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {
            // logger.debug("signIn callback", user, account, profile, email, credentials)
            logger.debug("signIn callback")
            return true
        },
    },
    secret: process.env['NEXTAUTH_SECRET'],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    session: { strategy: "jwt" }, // for credential auth sync width database
}

export default NextAuth(authOptions)