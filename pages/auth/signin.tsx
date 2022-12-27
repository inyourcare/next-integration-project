import { useNextAuthDisabled } from "@core/hooks/useNextAuthDisabled"
import { useNextSessionAuthenticated } from "@core/hooks/useNextSessionAuthenticated";
import { logger } from "@core/logger";
import popup from "@core/popup";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getCsrfToken, getProviders, LiteralUnion, signOut, useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default function SignIn({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { csrfToken, providers } = data
    const session = useSession();
    const signupWithPopup = (id: string) => popup({ path: '/auth/signinpopup?prividerId=' + id })

    useNextAuthDisabled()
    useNextSessionAuthenticated()
    return (<div>
        <form method='post' action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            username : <input type="text" name="username" required />
            password : <input type="password" name="password" />
            <input type="submit" />
        </form>
        {providers
            && (
                Object.keys(providers).map(k => {
                    const provider = providers[k];
                    if (provider.id === "credentials") return null
                    return (<div key={provider.name}>
                        <button
                            type="button"
                            color="primary"
                            onClick={() => signupWithPopup(provider.id)}
                        >
                            {provider.name}로 로그인 하기
                        </button>
                    </div>)
                })
            )}
        {session.status === 'authenticated' && <button
            type="button"
            color="primary"
            onClick={() => { signOut() }}
            className={``}
        >
            {"next auth 로그아웃"}
        </button>}
    </div>)
}

interface Props {
    data: {
        csrfToken: string | undefined,
        providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null,
        // session: Session | null
    }
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res, locale } = context;
    const csrfToken = await getCsrfToken(context)
    const providers = await getProviders()
    // const session = await unstable_getServerSession(req, res, authOptions)
    // logger.debug('sinin::getServerSideProps', csrfToken)
    return {
        props: {
            // data: { csrfToken, providers, session }
            data: { csrfToken, providers }
        },
    };
}