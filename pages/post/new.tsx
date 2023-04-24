import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import Image from "next/image";
import SearchSong from "../../components/posts/search/SearchSong";
import FormLoader from "../../components/layout/loader/FormLoader";
import PostForm from "../../components/authentication/form/PostForm";
import { SearchMusicProvider } from "../../context/searchMusicContext";
import decodeJWT from "../../functions/decodeJWT";
import postRequest from "../../functions/requests/postRequest";
import { getCookie } from "cookies-next";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function publish(song: string, caption: string) {
    const jwt = decodeJWT(getCookie("cookieToken").toString());

    const result = await postRequest(
      {
        caption: caption,
        authorID: jwt.userId,
        songURL: song,
      },
      "api/posts",
      true
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result?.status == 201) {
      toast.success(`Post created!`);
      router.push("/home/timeline");
    } else {
      toast.error(result?.data?.message);
      SetLoader(false);
    }
  }

  const changeLoader = (loader: string) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  const openModal = (e: any) => {
    e.preventDefault();
    const searchModal = document.getElementById("delete-modal");
    searchModal.style.height = "100%";
  };

  return (
    <>
      <Head>
        <title>Westernal - New Post</title>
      </Head>

      <BackHeader title="New Post" />

      <SearchMusicProvider>
        <SearchSong />
      </SearchMusicProvider>

      <main className="flex add-post">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

          {loader ? <FormLoader /> : null}

          <PostForm
            publish={publish}
            changeLoader={changeLoader}
            openModal={openModal}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewPost;