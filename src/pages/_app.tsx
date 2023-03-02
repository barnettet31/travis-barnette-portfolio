import { useEffect, type ReactElement, type ReactNode } from "react";
import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";

import "../styles/globals.css";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getCurrentPage } from "~/utils/getCurrentPage";
// No changes to this type
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Add generic type
type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout || ((page) => page);
  const { pathname } = useRouter();
  useEffect(() => {
    const checkDarkMode = function () {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    checkDarkMode();
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title> {getCurrentPage(pathname)} - Travis Barnette</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
