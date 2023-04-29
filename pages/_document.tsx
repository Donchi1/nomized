import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
     <Head>

     <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
 <link  rel="apple-touch-icon" href="/apple-touch.icon.png" />
<link rel="stylesheet" href="/assets/styles/bootstrap.min.css"/>
<link rel="stylesheet" href="/assets/styles/themify-icons.css"/>
<link rel="stylesheet" href="/assets/styles/materialdesignicons-min.css"/>
<link rel="stylesheet" href="/assets/styles/owl.carousel.css"/>
<link rel="stylesheet" href="/assets/styles/owl.theme.css"/>

<link rel="stylesheet" href="/assets/styles/animate.css"/>

<link rel="stylesheet" href="/assets/styles/magnific-popup.css"/>

<link rel="stylesheet" href="/assets/styles/style-three.css"/>

</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
