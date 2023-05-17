import { useEffect, useState } from "react";
import Link from "next/link";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import { getCookie } from "cookies-next";
import { usePostContext } from "../../../context/postContext";

const LikePost = () => {
  const post = usePostContext();
  const [likes, SetLikes] = useState<number>(post.likes.length);
  const [hasLiked, SetHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (
      post.likes.includes(decodeJWT(getCookie("cookieToken").toString()).userId)
    ) {
      document.getElementsByClassName(post._id)[0].classList.add("liked");
      SetHasLiked(true);
    }
  }, [post._id, post.likes]);

  async function likePost(e: any) {
    e.preventDefault();
    var token = getCookie("cookieToken").toString();
    const userID = decodeJWT(token).userId;

    if (!post.likes.includes(userID) || !hasLiked) {
      const result = await postRequest(
        {
          userId: userID,
        },
        `api/posts/like/${post._id}`,
        true
      );

      if (result?.status == 200) {
        document.getElementsByClassName(post._id)[0].classList.add("liked");
        SetLikes(likes + 1);
        SetHasLiked(true);
      }
    }
  }

  async function unlikePost(e: any) {
    e.preventDefault();

    var token = getCookie("cookieToken").toString();

    const userID = decodeJWT(token).userId;

    if (post.likes.includes(userID) || hasLiked) {
      const result = await postRequest(
        {
          userId: userID,
        },
        `api/posts/unlike/${post._id}`,
        true
      );

      if (result?.status == 200) {
        document.getElementsByClassName(post._id)[0].classList.remove("liked");
        SetLikes(likes - 1);
        SetHasLiked(false);
      }
    }
  }

  return (
    <div className="flex gap-5">
      <a href="#" onClick={hasLiked ? unlikePost : likePost} id={"a-like"}>
        <svg version="1.1" id="like-btn" viewBox="0 0 20 19">
          <g id="Iconly/Bold/Heart" fill="none">
            <g id="Heart" fill="black">
              <path
                d="M6.28001656,3.46389584e-14 C6.91001656,0.0191596721 7.52001656,0.129159672 8.11101656,0.330159672 L8.11101656,0.330159672 L8.17001656,0.330159672 C8.21001656,0.349159672 8.24001656,0.370159672 8.26001656,0.389159672 C8.48101656,0.460159672 8.69001656,0.540159672 8.89001656,0.650159672 L8.89001656,0.650159672 L9.27001656,0.820159672 C9.42001656,0.900159672 9.60001656,1.04915967 9.70001656,1.11015967 C9.80001656,1.16915967 9.91001656,1.23015967 10.0000166,1.29915967 C11.1110166,0.450159672 12.4600166,-0.00984032788 13.8500166,3.46389584e-14 C14.4810166,3.46389584e-14 15.1110166,0.0891596721 15.7100166,0.290159672 C19.4010166,1.49015967 20.7310166,5.54015967 19.6200166,9.08015967 C18.9900166,10.8891597 17.9600166,12.5401597 16.6110166,13.8891597 C14.6800166,15.7591597 12.5610166,17.4191597 10.2800166,18.8491597 L10.2800166,18.8491597 L10.0300166,19.0001597 L9.77001656,18.8391597 C7.48101656,17.4191597 5.35001656,15.7591597 3.40101656,13.8791597 C2.06101656,12.5301597 1.03001656,10.8891597 0.390016562,9.08015967 C-0.739983438,5.54015967 0.590016562,1.49015967 4.32101656,0.269159672 C4.61101656,0.169159672 4.91001656,0.0991596721 5.21001656,0.0601596721 L5.21001656,0.0601596721 L5.33001656,0.0601596721 C5.61101656,0.0191596721 5.89001656,3.46389584e-14 6.17001656,3.46389584e-14 L6.17001656,3.46389584e-14 Z M15.1900166,3.16015967 C14.7800166,3.01915967 14.3300166,3.24015967 14.1800166,3.66015967 C14.0400166,4.08015967 14.2600166,4.54015967 14.6800166,4.68915967 C15.3210166,4.92915967 15.7500166,5.56015967 15.7500166,6.25915967 L15.7500166,6.25915967 L15.7500166,6.29015967 C15.7310166,6.51915967 15.8000166,6.74015967 15.9400166,6.91015967 C16.0800166,7.08015967 16.2900166,7.17915967 16.5100166,7.20015967 C16.9200166,7.18915967 17.2700166,6.86015967 17.3000166,6.43915967 L17.3000166,6.43915967 L17.3000166,6.32015967 C17.3300166,4.91915967 16.4810166,3.65015967 15.1900166,3.16015967 Z"
                id="id_101"
                className={post._id}
              ></path>
            </g>
          </g>
        </svg>
      </a>
      <Link href={`/likes/${post._id}`}>
        <p id="like-count">{likes}</p>
      </Link>
    </div>
  );
};

export default LikePost;
