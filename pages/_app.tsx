import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EventProvider from './context/EventProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return <EventProvider>
    <Component {...pageProps} />
  </EventProvider>
}

export default MyApp
