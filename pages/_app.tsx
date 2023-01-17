import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import apollo from "apollo";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ApolloProvider client={apollo}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
