import "../styles/globals.css";
import type { AppType } from "next/app";
import Head from "next/head";
import ScrollToTop from "../components/ScrollToTop";
import { api } from "~/utils/api";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

const ProjectDevens: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <div className="min-h-screen bg-slate-100 pb-20">
                <Head>
                    <title>PROJECT.Devens</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Component {...pageProps} />

                <ScrollToTop />
            </div>
        </SessionProvider>
    );
};

export default api.withTRPC(ProjectDevens);
