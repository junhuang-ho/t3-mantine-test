import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import ThemeProvider from "~/contexts/Theme";
import MainLayout from "~/components/layouts/MainLayout";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider>
        <MainLayout>
          {/* <SessionProvider session={session}> */}
          <Component {...pageProps} />
          {/* </SessionProvider> */}
        </MainLayout>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(App);
