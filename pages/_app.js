import "../styles/globals.css";
import { Work_Sans } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
const workSans = Work_Sans();
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider className={workSans.className}>
        <Component {...pageProps} />
        <Toaster position={"bottom-center"} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
