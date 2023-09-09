import React, { useRef, useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import UserInfo from "../UserInfo";
import CommentText from "./CommentText";
import styles from "./CommentSection.module.css";
import axios from "axios";

const CommentSection = ({
  comments: initialComments,
  postId,
  onNewComment,
}) => {
  const [allComments, setAllComments] = useState(initialComments || []);
  const endOfCommentsRef = useRef(null);

  const handleCommentSubmit = async (newCommentData) => {
    try {
      const response = await axios.post(`/comment/${postId}`, newCommentData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setAllComments((prevComments) => [...prevComments, response.data]);
      onNewComment();
    } catch (error) {
      console.error("Error posting the comment", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  useEffect(() => {
    setAllComments(initialComments);

    if (endOfCommentsRef.current) {
      endOfCommentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialComments]);
  return (
    <div>
      <div className={styles.commentsContainer}>
        <h3>All Comments</h3>
        {allComments.map((comment) => (
          <div
            key={comment.id}
            className={`${styles.comment} ${
              comment.selectOption === "A" ? styles.opinionA : styles.opinionB
            }`}
          >
            <UserInfo
              userImage={comment.userImage}
              userId={comment.userId}
              mbti={comment.mbti}
              opinion={comment.selectOption}
            />
            <CommentText
              comment={comment.content}
              likes={comment.likeCount}
              date={comment.createdAt}
              opinion={comment.selectOption}
            />
          </div>
        ))}
      </div>
      <CommentForm onSubmit={handleCommentSubmit} />
      <div ref={endOfCommentsRef}></div>
    </div>
  );
};

export default CommentSection;
