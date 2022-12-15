import Link from "next/link";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import DeleteComment from "./DeleteComment";
import ReplyComment from "./replies/ReplyComment";
import API from "../../../requests/API";
import Replies from "./replies/Replies";
import formatDate from "../../../Functions/formatDate";

const Comment = ({ comment, onDelete, onReply }) => {
  const [deletable, SetDeletable] = useState(false);
  const [replies, SetReplies] = useState([]);

  useEffect(() => {
    const getReplies = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/comments/replies/${comment._id}`);

      if (result.status == 200) {
        SetReplies(result.data.replies);
      }
    };

    const userId = jwtDecode(localStorage.getItem("token")).userId;

    if (userId === comment.writer.id) {
      SetDeletable(true);
    }

    getReplies();
  }, [comment]);

  return (
    <>
      <div className="comment flex" key={comment._id}>
        <p>
          <Link href={`/${comment.writer.username}`}>
            <span id="cm-user">{comment.writer.username}: </span>
          </Link>
          <span>{comment.message}</span>
        </p>
        <div className="cm-info">
          <div className="flex">
            <p id="date">{formatDate(comment.date)}</p>
            <ReplyComment onReply={onReply} id={comment._id} />
          </div>
          {deletable && <DeleteComment onDelete={onDelete} id={comment._id} />}
        </div>
      </div>
      <Replies replies={replies} onDelete={onDelete} />
    </>
  );
};

export default Comment;
