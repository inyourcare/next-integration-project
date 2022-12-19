import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

type BaseLayoutProps = {
    children: React.ReactNode,
};

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <>
            <Head>
                <title>소셜벤처 360 가이드북</title>
            </Head>
            <Header />
                {children}
            <Footer />
        </>
    );
}