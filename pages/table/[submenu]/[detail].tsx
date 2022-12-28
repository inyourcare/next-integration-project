import ReactTableLayout from "@components/layouts/table/layout";
import Link from "@components/wrapper/link";
import { Querys } from "@core/definitions";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { dehydrate, QueryClient, useQuery } from 'react-query';

export default function Table({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data } = useQuery(
        Querys.getUserList.key,
        () => Querys.getUserList.query())
    const tableData = { ...data }
    const columns = Querys.getUserList.columns

    return <ReactTableLayout columns={columns} data={tableData.users}>
        <br />
        <div>table<Link href={'/'}>home</Link></div>
    </ReactTableLayout>
}



interface Props {
    // dehydratedState: DehydratedState
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res, locale } = context;
    const queryClient = new QueryClient();
    await Promise.all([queryClient.prefetchQuery(
        Querys.getUserList.key,
        () => Querys.getUserList.query()
    )])
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}