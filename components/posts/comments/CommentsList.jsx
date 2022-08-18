import { useEffect, useState } from "react";
import API from "../../../requests/API";
import Comment from "./Comment";

const CommentsList = ({ postId, rerender, onReply }) => {
  const [comments, SetComments] = useState([]);
  const [deleted, SetDeleted] = useState(false);

  const onDelete = () => {
    SetDeleted(!deleted);
  };

  useEffect(() => {
    const getComments = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/comments/${postId}`);

      if (result.status == 200) {
        SetComments(result.data.comments);
      }
    };

    if (postId) {
      getComments();
    }
  }, [rerender, postId, deleted]);
  return (
    <div className="cm-list">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment._id}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default CommentsList;