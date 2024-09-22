import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import SpotifyPlayer from "../player/SpotifyPlayer";
import PostError from "./error/PostError";
import PostIcons from "./icons/PostIcons";
import formatDate from "../../functions/formatDate";
import decodeJWT from "../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { PostProvider } from "../../context/postContext";
import { Post as PostType } from "../../interfaces/interface";
import { HOST } from "../../data/data";
import dynamic from "next/dynamic";
const PostOptions = dynamic(() => import("./options/PostOptions"));

const Post = ({
  post,
  onDelete,
  isLoggedIn = true,
  onUnsave,
}: {
  post: PostType;
  onDelete: any;
  isLoggedIn?: boolean;
  onUnsave?: any;
}) => {
  const [isSpotify, SetIsSpotify] = useState<boolean>(true);
  const [error, SetError] = useState<boolean>(false);
  const [canDelete, SetCanDelete] = useState<boolean>(false);

  useEffect(() => {
    if (post.songUrl) {
      if (post.songUrl.toLowerCase().includes("spotify")) {
        SetIsSpotify(true);
      } else SetIsSpotify(false);
    }

    if (
      isLoggedIn &&
      post.author.username ===
        decodeJWT(getCookie("cookieToken").toString()).username
    ) {
      SetCanDelete(true);
    }
  }, [post, isLoggedIn]);

  const playerError = () => {
    SetError(true);
  };

  return (
    <PostProvider post={post}>
      <article className="post" id={`post${post._id}`}>
        <section className="post-header flex">
          <Link href={`/${post.author.username}`}>
            <div className="post-user flex">
              <Image
                src={HOST + post.author.image}
                alt="user avatar"
                id="avatar"
                width={40}
                height={40}
              />
              <p>{post.author.username}</p>
              {post.author.verified ? (
                <div className="verify">
                  <Image
                    src="/Images/verified (2).png"
                    alt="verify"
                    width={20}
                    height={20}
                  />
                </div>
              ) : null}
            </div>
          </Link>
          <PostOptions
            onDelete={onDelete}
            deletable={canDelete}
            isLoggedIn={isLoggedIn}
            onUnsave={onUnsave}
          />
        </section>

        <section className="post-song flex">
          {error ? <PostError /> : null}
          {!isSpotify && !error ? (
            <ReactPlayer
              url={post.songUrl}
              onError={playerError}
              controls={true}
              pip={true}
            />
          ) : null}
          {isSpotify && !error ? <SpotifyPlayer url={post.songUrl} /> : null}
        </section>

        <section className="post-caption">
          {post.caption ? (
            <strong id="post-caption" dir="auto">
              {post.caption}
            </strong>
          ) : null}
        </section>

        <section className="post-info flex">
          {isLoggedIn ? <PostIcons /> : null}
          <p id="date">{formatDate(post.date)}</p>
        </section>
      </article>
    </PostProvider>
  );
};

export default Post;
