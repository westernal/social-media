import Loader from "../components/layout/Loader";
import { useEffect } from "react";
import Head from "next/head";
import Login from "../components/authentication/Login";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function startLoaderPreview() {
      await sleep(1500);
      if (localStorage.getItem("token")) {
        router.push("/home");
      }
      if (document.getElementsByClassName("loader")[0]) {
        document.getElementsByClassName("loader")[0].style.display = "none";
        document.getElementsByClassName("login")[0].style.display = "flex";
      }
    }

    startLoaderPreview();
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <title>Westernal</title>
        <meta name="description" content="A social media" />
        <meta name="keywords" content="Westernal social media" />
      </Head>
      <Loader />
      <Login />
    </div>
  );
}
