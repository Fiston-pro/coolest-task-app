import ProtectedRoute from '@/components/protectedRoute'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { trpc } from '../utils/trpc';

 function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>ToDo App - Korera imbere</title>
      </Head>
      <Toaster toastOptions={{ duration: 4000 }} />
      {
        router.pathname === '/dashboard' ? <ProtectedRoute><Component {...pageProps} /></ProtectedRoute> : <Component {...pageProps} />
      }
    </div>
  )
}

export default trpc.withTRPC(App);
