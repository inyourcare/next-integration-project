import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
// import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="og:image" content={`${process.env['HOST']}`} />
                    <meta property="og:title" content="" />
                    <meta property="og:url" content="" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description" content="" />
                    <meta property="og:site_name" content="" />
                    {/* <meta property="og:locale" content="en_US" /> */}
                    <meta property="og:locale" content="ko_KR" />

                    {/* <meta name="robots" content="noindex"/> */}
                    <meta name="description" content="" />
                    {/* <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script> */}

                    {/* favicon */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
                    <meta name="msapplication-TileColor" content="#da532c"></meta>
                    <meta name="theme-color" content="#ffffff"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    // const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            // enhanceApp: App => props => materialSheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: <>{initialProps.styles}</>
    };
};