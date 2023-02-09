import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ScrollToTop from "../components/ScrollToTop";

function SoloLive({ Component, pageProps }: AppProps) {
    return (
        <div>
            <div>
                <Head>
                    <title>PROJECT.Devens</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Component {...pageProps} />

                <ScrollToTop />
            </div>
        </div>
    );
}

export default SoloLive;
