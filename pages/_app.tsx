import "@/styles/globals.css";
import { AppProps } from "next/app";
import Header from "@/components/Header";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import Protected from "@/components/Protected";
import { useGetCurrentUser } from "@/components/hooks/GetCurrentUser";
import PLoader from "@/components/PLoader";
import ProtectedAdmin from "@/components/ProtectedAdmin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
       

        <meta
          property="og:title"
          content="Trading nomalized or easy and fast establishment"
        />
        <meta property="og:description" content="" />
        <meta property="og:image" content="./ogpic.png" />
        <meta
          name="description"
          content="Make great wealth for a future establishment"
        />
        <meta
          name="description"
          content="MonetCoins,  A Modern Investmet Platform"
        />
        <meta
          name="keywords"
          content="Payment,bitcoin,investment,business, earning"
        />
        <link
          rel="shortcut icon"
          href="/assets/logo/favicon-32.png"
          type="image/x-icon"
        />

        <link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png" />
        <title>MonetCoins</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/logo/favicon.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Monetcoins | Home" />

        <meta itemProp="name" content="MonetCoins" />
        <meta
          itemProp="description"
          content="MonetCoins,  A Modern Investmet Platform"
        />
        <meta itemProp="image" content="https://monetcoins.info" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="MonetCoins" />
        <meta
          property="og:description"
          content="MonetCoins,  A Modern Investmet Platform"
        />
        <meta property="og:image" content="/assets/imgs/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://monetcoins.info" />

        <meta name="twitter:card" content="summary_large_image" />
        <title>Cryptonomize</title>
      </Head>
      {/* Latest jQuery */}
<Script id="jquery" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/jquery-1.12.4.min.js"></Script>
{/* Latest compiled and minified Bootstrap */}
<Script id="popper" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></Script>
{/* modernizer JS */}
<Script id="modernR" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/modernizr-2.8.3.min.js"></Script>
{/* owl-carousel min js  */}
<Script id="owl" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/owlcarousel/js/owl.carousel.min.js"></Script>
{/* magnific-popup js */}              
<Script id="pop" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/jquery.magnific-popup.min.js"></Script>
{/* jquery counterup */}
<Script id="counter" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/jquery.counterup.min.js"></Script>
<Script id="particle" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/countdown.js"></Script>
{/* particles */}
<Script id="" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/particles.min.js"></Script>
<Script id="" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/app.js"></Script>
{/* WOW - Reveal Animations When You Scroll */}
<Script id="wow" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/wow.min.js"></Script>
{/* scrolltopcontrol js */}
<Script id="scroll" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/scrolltopcontrol.js"></Script>
{/* scripts js */}
<Script id="js" src="https://bestwpware.com/html/tf/crptiam-demo/crptiam/assets/js/scripts.js"></Script>
<Script id="font" src="https://kit.fontawesome.com/9704e077c0.js" crossOrigin="anonymous"></Script>


  <div data-spy="scroll" data-offset="80">
        
      <Hydrated>
        <Provider store={store}>
          {Component.defaultProps?.needsAuth ? (
            <Protected>
              {Component.defaultProps?.isAdmin ? (
                <ProtectedAdmin>
                  <Component {...pageProps} />
                </ProtectedAdmin>
              ) : (
                <Component {...pageProps} />
              )}
            </Protected>
          ) : (
            <PLoader>
              <Component {...pageProps} />
            </PLoader>
          )}
        </Provider>
      </Hydrated>
      </div>
    </>
  );
}

const Hydrated = ({ children }: { children?: any }) => {
  const [hydration, setHydration] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);

  return hydration ? children : "";
};
