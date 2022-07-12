import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'
import { store } from 'store'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <NextNProgress
          color="#BEE3F8"
          height={5}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
