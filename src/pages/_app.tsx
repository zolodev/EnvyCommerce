import type { AppProps } from "next/app";
import React from "react";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import CartContextProvider from "../context/CartContext";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
      <Cart />
    </CartContextProvider>
  );
}

export default MyApp;
