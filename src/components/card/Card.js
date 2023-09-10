import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaComment,
  FaEye,
} from "react-icons/fa";
import styles from "./DebateCard.module.css";
import { calculatePercentage } from "../../utils/calculatePercent";

const DebateCard = ({ debate }) => {
  const { id, title, A, B, messages, views, isUnderway, hashtags } = debate;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + `/post/${id}`);
    alert("링크가 클립보드에 복사되었습니다.");
  };
  const handleShareClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중지
    event.preventDefault(); // 기본 이벤트 동작 중지
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookmarkClick = async (event) => {
    event.stopPropagation(); // 상세 페이지로 이동하지 않게 함

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인한 뒤에 이용할 수 있습니다.");
      return;
    }

    try {
      await axios.post(
        `/post/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked(!isBookmarked); // 북마크 상태 토글
      alert("북마크를 추가했습니다.");
    } catch (error) {
      console.error("Error", error);
      alert("북마크 추가에 실패했습니다.");
    }
  };
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
    {
      Icon: isBookmarked ? FaBookmark : FaRegBookmark,
      data: null,
      onClick: handleBookmarkClick,
    },
    { Icon: FaShare, data: null, onClick: (event) => handleShareClick(event) },
  ];
  return (
    <div>
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
          {iconsData.map(({ Icon, data, onClick }, idx) => (
            <div key={idx} className={styles.iconWrapper} onClick={onClick}>
              <Icon />
              {data && <span>{data}</span>}
            </div>
          ))}
        </div>
      </Link>
      {showModal && (
        <div className={styles.modalContainer} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Share this link:</p>
            <input
              type="text"
              value={window.location.href + `/post/${id}`}
              readOnly
            />
            <div>
              <button onClick={handleCloseModal}>취소</button>
              <button onClick={handleCopyLink}>복사</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateCard;
