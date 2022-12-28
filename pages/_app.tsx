import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Hydrate>
  </QueryClientProvider>
}
