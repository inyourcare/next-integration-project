import CarouselCard from "@components/cards/carousel/CarouselCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "./footer";
import Header from "./header";

type DetailLayoutProps = {
    children: React.ReactNode,
    items: string[]
};

export default function CarauselLayout({ children, items }: DetailLayoutProps) {
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
            <CarouselCard items={items} />
            {children}
            <Footer enable={state.footer} />
        </>
    );
}