import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import {magic} from "@/lib/magic-client";
import {useRouter} from "next/router";
import Loading from "@/components/loading/Loading";


export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (magic){
        const isLoggedIn = await magic.user.isLoggedIn();

        // if (isLoggedIn) {
        //   await router.push('/')
        // } else {
        //   await router.push('/login')
        // }
      }

      setIsLoading(false)
    })()
  }, [])

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
