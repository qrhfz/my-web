import '../styles/globals.css'
import "../styles/github-dark.min.css";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
