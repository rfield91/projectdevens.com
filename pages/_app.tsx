import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScrollToTop from "../components/ScrollToTop";

function SoloLive({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-slate-100 pb-20 min-h-screen">
            <Head>
                <title>PROJECT.Devens</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />

            <ScrollToTop />
        </div>
    );
}

export default SoloLive;
