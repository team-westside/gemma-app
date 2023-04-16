import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Gemma App for Smart Contracts" />
        <meta charSet="utf-8" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
        <meta name="viewport" content="width=device-width" />
        <title>Gemma</title>
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#000000" />
        <meta name="og:image" content="/logo.svg" />
        <meta name="og:title" content="Gemma" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
