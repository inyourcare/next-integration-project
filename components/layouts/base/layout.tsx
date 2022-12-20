import Head from "next/head";
import { useState } from "react";
import Footer from "./footer";
import Header from "./header";

type BaseLayoutProps = {
    children: React.ReactNode,
};

export default function BaseLayout({ children }: BaseLayoutProps) {
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
            {children}
            <Footer enable={state.footer} />
        </>
    );
}