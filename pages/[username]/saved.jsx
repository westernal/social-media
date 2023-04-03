import { useEffect, useState, useMemo } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import Post from "../../components/posts/Post";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import PostLoader from "../../components/layout/loader/ContentLoader";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import Cookies from "js-cookie";

const Saved = () => {
  const [posts, SetPosts] = useState();

  const getSavedPosts = async () => {
    var token = Cookies.get("cookieToken").toString();
    const userID = decodeJWT(token).userId;
    const result = await getRequest(`api/users/saved-posts/${userID}`, true);

    if (result?.status == 200) {
      SetPosts(result.data.posts);
    }
  };

  const onDeletePost = (id) => {
    const newPosts = posts.filter((post) => {
      return post._id != id;
    });

    SetPosts(newPosts);
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Westernal - Saved Posts</title>
      </Head>
      <BackHeader title={"Saved Posts"} />
      <main className="saved-posts">
        <section className="post-list flex">
          {!posts
            ? [1, 2, 3].map((index) => {
                return (
                  <div className="post" key={index}>
                    <PostLoader />
                  </div>
                );
              })
            : null}

          {posts?.map((post) => {
            return (
              <Post
                post={post}
                onDelete={onDeletePost}
                key={post._id}
                onUnsave={onDeletePost}
              />
            );
          })}
        </section>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
};

export default Saved;
