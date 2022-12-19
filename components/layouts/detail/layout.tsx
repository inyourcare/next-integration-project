import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./footer";
import Header from "./header";

type DetailLayoutProps = {
    children: React.ReactNode,
};

export default function DetailLayout({ children }: DetailLayoutProps) {
    const router = useRouter()
    return (
        <>
            <Head>
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    );
}