import ReactTableCard from "@components/cards/tables/ReactTableCard";
import Head from "next/head";
import { useState } from "react";
import { Column } from "react-table";
import Footer from "./footer";
import Header from "./header";

type Props = {
    children: React.ReactNode,
    columns: Column<{}>[];
    data: {}[];
};

export default function ReactTableLayout({ children, columns, data }: Props) {
    const initialState = {
        header: true,
        footer: true
    }
    const [state, setState] = useState(initialState)
    const toggleFooter = () => setState({ ...state, footer: !state.footer })
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Header enable={state.header} toggleFooter={toggleFooter} />
            <ReactTableCard columns={columns} data={data} />
            {children}
            <Footer enable={state.footer} />
        </>
    );
}