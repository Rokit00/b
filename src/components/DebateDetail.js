import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DebateDetail.module.css";
import OpinionBarChart from "./OpinionBarChart";
import TopComments from "./comment/TopComments";
import CommentSection from "./comment/CommentSection";
import { useParams } from "react-router-dom";
import NavBar from "./nav_bar/NavBar";
import { calculatePercentage } from "../utils/calculatePercent";

const DebateDetail = () => {
  const { id } = useParams();
  const [debate, setDebate] = useState(null);
  const [comments, setComments] = useState([]);

  const handleNewComment = async () => {
    try {
      const commentsResponse = await axios.get(`/comment/${id}`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error fetching the updated comments", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const debateResponse = await axios.get(`/post/${id}`);
        setDebate(debateResponse.data);
        const commentsResponse = await axios.get(`/comment/${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    }

    fetchData();
  }, [id]);

  if (!debate) {
    return <div>Loading...</div>;
  }

  const opinionCounts = comments.reduce(
    (acc, comment) => {
      if (comment.selectOption === "A") acc.A++;
      if (comment.selectOption === "B") acc.B++;
      return acc;
    },
    { A: 0, B: 0 }
  );

  const { percentageA, percentageB } = calculatePercentage(
    opinionCounts.A,
    opinionCounts.B
  );

  const topAComments = comments
    .filter((c) => c.selectOption === "A")
    .sort((a, b) => b.likes - a.likes || a.createdAt - b.createdAt);
  const topBComments = comments
    .filter((c) => c.selectOption === "B")
    .sort((a, b) => b.likes - a.likes || a.createdAt - b.createdAt);

  const topCommentA = topAComments[0];
  const topCommentB = topBComments[0];

  return (
    <div className={styles.detailContainer}>
      <NavBar />
      <h2>{debate.title}</h2>
      <OpinionBarChart
        opinionA={percentageA}
        opinionB={percentageB}
        choiceA={debate.optionA}
        choiceB={debate.optionB}
      />
      <TopComments topCommentsA={topCommentA} topCommentsB={topCommentB} />
      <CommentSection
        comments={comments}
        postId={id}
        onNewComment={handleNewComment}
      />
    </div>
  );
};

export default DebateDetail;
