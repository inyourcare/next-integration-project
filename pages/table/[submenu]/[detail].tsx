import ReactTableLayout from "@components/layouts/table/layout";
import Link from "@components/wrapper/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMemo } from "react";
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';

export default function Table({ dehydratedState }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // const { data } = useQuery("userList", () => getUsers())
    const { data } = useQuery("userList", dehydratedState.queries.filter(q => q.queryKey === 'userList')[0]) as any
    const tableData = { ...data }
    // dehydratedState.queries.filter(q=>q.queryKey==='userList').map(q=>q.state.data)

    const columns = useMemo(
        () => [
            {
                Header: "Menu",
                columns: [{
                    accessor: "name",
                    Header: "Name",
                    // Header: () => (
                    //     <p style={{text-align: 'center}}>번호</p>
                    //   ),
                    show: true,
                    maxWidth: 300,
                    minWidth: 300,
                    width: 300,
                },
                {
                    accessor: "menuType",
                    Header: "menuType",
                },
                {
                    accessor: "id",
                    Header: "id",
                },
                {
                    accessor: "code",
                    Header: "code",
                },
                {
                    accessor: "order",
                    Header: "order",
                },
                {
                    accessor: "creator",
                    Header: "creator",
                },
                {
                    accessor: "modifier",
                    Header: "modifier",
                },]
            }
        ],
        []
    );
    return <ReactTableLayout columns={columns} data={tableData.users}>
        <br />
        <div>table<Link href={'/'}>home</Link></div>
    </ReactTableLayout>
}

export const getUsers = async () =>
    await fetch(`${process.env.NEXTAPI_BASE_URL || '/api'}/user/list`, {
        method: 'POST',
        body: JSON.stringify({
            page: 0,
            limit: 1000,
            // conditions: {
            // creator: {
            // email: 'admin@sotong.co.kr'
            // email
            //     ...(email && { email: email })
            // }
            // }
            // conditions
            conditions: {}
        }),
        headers: { "Content-Type": "application/json" }
    }).then((result) => result.json())

interface Props {
    dehydratedState: DehydratedState
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res, locale } = context;
    const queryClient = new QueryClient();
    await Promise.all([queryClient.prefetchQuery(
        "userList",
        () => getUsers()
    )])
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}