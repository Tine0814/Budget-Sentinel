import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import React, { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import Head from "next/head";
import { default as Router } from "next/router";
import NProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { useEmotionCache } from "@/core/hooks";
import { CookiesProvider } from "react-cookie";
import GlobalLayout from "./shared/GlobalLayout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const cache = useEmotionCache();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={cache}>
      <CookiesProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta
            name="description"
            content="Default description for My Next.js App."
          />
        </Head>
        <GlobalLayout>
          <Suspense fallback={<div>Loading...</div>}>
            {getLayout(<Component {...pageProps} />)}
          </Suspense>
        </GlobalLayout>
      </CookiesProvider>
    </CacheProvider>
  );
}
