import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBookmark, FaShare, FaComment, FaEye } from "react-icons/fa";
import styles from "./DebateCard.module.css";
import { calculatePercentage } from "../../utils/calculatePercent";

const DebateCard = ({ debate }) => {
  const { id, title, A, B, messages, views, isUnderway, hashtags } = debate;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comment/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching the comments", error);
      }
    };

    fetchComments();
  }, [id]);

  const opinionCounts = comments.reduce(
    (acc, comment) => {
      acc[comment.selectOption]++;
      return acc;
    },
    { A: 0, B: 0 }
  );

  const { percentageA, percentageB } = calculatePercentage(
    opinionCounts.A,
    opinionCounts.B
  );

  const iconsData = [
    { Icon: FaComment, data: messages },
    { Icon: FaEye, data: views },
    { Icon: FaBookmark, data: null },
    { Icon: FaShare, data: null },
  ];

  return (
    <Link to={`/post/${id}`} className={styles.container}>
      {isUnderway && (
        <small className={styles.underwayText}>현재 진행 중인 토론</small>
      )}
      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.percent}>
          A. {percentageA}% vs B. {percentageB}%
        </p>
        <div className={styles.options}>
          <p className={styles.option}>{A}</p>
          <p className={styles.option}>{B}</p>
        </div>
        <div className={styles.hashtags}>{hashtags}</div>
      </div>

      <div className={styles.icons}>
        {iconsData.map(({ Icon, data }, idx) => (
          <div key={idx} className={styles.iconWrapper}>
            <Icon />
            {data && <span>{data}</span>}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default DebateCard;
