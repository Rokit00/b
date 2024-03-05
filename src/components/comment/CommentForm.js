import React, { useState } from "react";
import styles from "./CommentForm.module.css";
import { useAuth } from "../../hook/AuthContext";

const OpinionButton = ({
  opinion,
  selectedOpinion,
  setSelectedOpinion,
  isLoggedIn,
}) => (
  <button
    className={`${styles.opinionButton} ${
      selectedOpinion === opinion ? styles[`selected${opinion}`] : ""
    }`}
    onClick={() => setSelectedOpinion(opinion)}
    disabled={!isLoggedIn}
  >
    {opinion}
  </button>
);

const CommentForm = ({ onSubmit, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const { isLoggedIn, user } = useAuth();

  const handleSubmit = () => {
    if (!newComment || !selectedOpinion || !user) return;

    const newCommentData = {
      member: user.id,
      userId: user.userId,
      userImage: user.profileImage || "https://yourDefaultUserImageUrl.com",
      selectOption: selectedOpinion,
      content: newComment,
      likes: 0,
      post: postId,
      mbti: user.mbti,
    };
    onSubmit(newCommentData);
    setNewComment("");
    setSelectedOpinion(null);
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8080/members/login", {
  //       userId: userId.value,
  //       password: password.value,
  //     })
  //     .then((response) => {
  //       console.log("Login successful:", response.data);
  //       localStorage.setItem("token", response.data);
  //       setIsLoggedIn(true);

  //       if (from.pathname !== "/signup") {
  //         navigate(from.pathname);
  //       } else {
  //         navigate("/lists");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Login error:", error);
  //       setErrorMessage(
  //         "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
  //       );
  //     });
  // };

  return (
    <div className={styles.inputContainer}>
      <OpinionButton
        opinion="A"
        selectedOpinion={selectedOpinion}
        setSelectedOpinion={setSelectedOpinion}
        isLoggedIn={isLoggedIn}
      />
      <OpinionButton
        opinion="B"
        selectedOpinion={selectedOpinion}
        setSelectedOpinion={setSelectedOpinion}
        isLoggedIn={isLoggedIn}
      />
      <input
        className={styles.commentInput}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={
          isLoggedIn
            ? "Write your comment..."
            : "로그인 후에 이용 가능한 기능입니다."
        }
        disabled={!isLoggedIn}
      />
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!isLoggedIn}
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;
