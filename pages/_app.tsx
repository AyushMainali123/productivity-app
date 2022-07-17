import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'
import { store } from 'store'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'
import { SessionProvider } from "next-auth/react"
import AuthGuard from 'components/AuthGuard'
import { QueryClient, QueryClientProvider, QueryKey } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'

// Custom Interface for including requireAuth props passed by each page.
interface MyAppProps extends AppProps {
  Component: AppProps['Component'] & {
    requireAuth: boolean
  }
}


const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`);
  return data;
};


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <NextNProgress
              color="#BEE3F8"
              height={5}
            />
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </ChakraProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
