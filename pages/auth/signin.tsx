import { useNextAuthDisabled } from "@core/hooks/useNextAuthDisabled"
import { logger } from "@core/logger";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { csrfToken } = data

    useNextAuthDisabled()
    return (<div>
        <form method='post' action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            username : <input type="text" name="username" required />
            password : <input type="password" name="password" />
            <input type={'checkbox'} value='remember' />
            <input type="submit" />
        </form>
    </div>)
}

interface Props {
    data: {
        csrfToken: string | undefined
    }
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res, locale } = context;
    const csrfToken = await getCsrfToken(context)
    // logger.debug('sinin::getServerSideProps', csrfToken)
    return {
        props: {
            data: { csrfToken }
        },
    };
}