import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Montserrat:wght@300;400;500;600&family=Nunito+Sans:wght@300;600;800&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@400;600&family=Poppins:wght@400;600;700&family=Roboto+Slab&display=swap"
          rel="stylesheet" />
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
