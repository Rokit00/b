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

  useEffect(() => {
    if (initialComments) {
      setAllComments(initialComments);
    }
  }, [initialComments]);

  useEffect(() => {
    if (endOfCommentsRef.current) {
      endOfCommentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allComments]);

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
      console.error("Error", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleLike = async (commentId) => {
    try {
        const response = await axios.post(`/comment/${commentId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        
      
        console.log(response.data);

        if (response.data) {
            const updatedLikes = response.data.likes;
            setAllComments((prevComments) => 
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? { ...comment, likeCount: updatedLikes }
                        : comment
                )
            );
            console.log(updatedLikes);
        }
        console.log(response.data);
    } catch (error) {
        console.error("Error", error);
        alert("댓글 좋아요 변경에 실패했습니다.");
    }
};

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
              onLike={() => handleLike(comment.id)}
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
