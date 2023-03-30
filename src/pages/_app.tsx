import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {useState} from "react";
import Loading from "@/components/loading/Loading";


export default function App({ Component, pageProps }: AppProps) {
  const [isLoading] = useState(true);

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
