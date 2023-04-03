import { useMemo } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import Cookies from "js-cookie";

const SavePost = ({ id, hide, onUnsave }) => {
  const [isSaved, SetIsSaved] = useState(false);

  const checkUser = async () => {
    var token = Cookies.get("cookieToken").toString();
    const userId = decodeJWT(token).userId;
    const result = await postRequest(
      {
        postId: id,
      },
      `api/users/saved-posts/${userId}`,
      true
    );

    if (result?.status == 200) {
      SetIsSaved(result.data.isSaved);
    }
  };

  useMemo(() => {
    checkUser();
  }, []);

  const checkSavePost = () => {
    if (!isSaved) {
      save();
    } else unsave();
  };

  const save = async () => {
    var token = Cookies.get("cookieToken").toString();
    const userId = decodeJWT(token).userId;

    const result = await postRequest(
      {
        userId: userId,
      },
      `api/posts/save/${id}`,
      true
    );

    if (result.status == 200) {
      SetIsSaved(true);
      hide();
      toast.success("Post saved.");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again.");
    }
  };

  const unsave = async () => {
    var token = Cookies.get("cookieToken").toString();
    const userId = decodeJWT(token).userId;

    const result = await postRequest(
      {
        userId: userId,
      },
      `api/posts/unsave/${id}`,
      true
    );

    if (result.status == 200) {
      SetIsSaved(false);
      if (onUnsave) {
        onUnsave(id);
      }
      hide();
      toast.success("Post unsaved.");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again.");
    }
  };

  return (
    <li onClick={checkSavePost} id="save-post">
      {isSaved ? "Unsave post" : "Save post"}
    </li>
  );
};

export default SavePost;
