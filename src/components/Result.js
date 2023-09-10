import React, { useState } from "react";
import { checkCompatibility, mbtiToAlphabet } from "../utils/compatibility";
import LZString from "lz-string";
import styles from "./Result.module.css";
import LinkModal from "./LinkModal";

const Result = ({
  savedData,
  mbtiTexts,
  setShowContent,
  setShowResult,
  setSavedData,
  isLoggedIn,
}) => {
  // 모달 상태를 관리하는 상태 변수들

  const [showModal, setShowModal] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [sharedLink, setSharedLink] = useState("");
  const handleGoBack = () => {
    setShowContent(false);
    setShowResult(false);
    setSavedData([]);
  };
  // 선택된 사용자 인덱스를 관리하는 상태 변수
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  // 사용자 데이터를 렌더링하는 함수
  const renderUserData = () => {
    if (!savedData || savedData.length === 0) {
      return <p>데이터가 없습니다.</p>;
    }

    return (
      <div className={styles.userData}>
        {savedData.map((user, index) => (
          <div
            key={index}
            className={`${styles.user} ${
              index === selectedUserIndex ? styles.selected : ""
            }`}
            onClick={() => setSelectedUserIndex(index)}
          >
            <div className={styles.userContainer}>
              <p className={styles.userName}>{user.name}님</p>
              <div className={styles.userImages}>
                {renderSelectedImages(user.mbti, index)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 사용자의 궁합 결과를 렌더링하는 함수
  const renderCompatibilityResult = () => {
    if (!savedData || savedData.length < 2) {
      return <p>데이터가 충분하지 않습니다.</p>;
    }

    const selectedUserData = savedData[selectedUserIndex];
    const mbti1 = mbtiToAlphabet(selectedUserData.mbti);
    const name1 = selectedUserData.name;

    return (
      <div className={styles.savedDataContainer}>
        {savedData.map((user, index) => {
          if (index !== selectedUserIndex) {
            const mbti2 = mbtiToAlphabet(user.mbti);
            const name2 = user.name;
            const result = checkCompatibility(mbti1, mbti2);

            return (
              <div
                key={`${name1}-${name2}`}
                className={`${styles.compatibilityResult} ${styles.fadeInOut}`}
              >
                <p>
                  {name1}님({mbti1})과 {name2}님({mbti2}) 의 궁합 결과: {result}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  // 선택된 이미지를 렌더링하는 함수
  const renderSelectedImages = (mbti, userIndex) => {
    return mbti.map((textIndex, rowIndex) => {
      const textValue = mbtiTexts[textIndex];
      if (textIndex !== -1 && textValue) {
        return (
          <div key={rowIndex} className={styles.resultTexts}>
            <span
              className={`${styles.resultText} ${styles[textValue]}
              ${userIndex === selectedUserIndex ? styles.selected : ""}`}
              onClick={() => setSelectedUserIndex(userIndex)}
            >
              {textValue}
            </span>
          </div>
        );
      }
      return null;
    });
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedLink);
    setIsLinkModalOpen(false);
  };
  const handleShareLink = () => {
    const host = window.location.host;

    const compressedData = LZString.compressToEncodedURIComponent(
      JSON.stringify(savedData)
    );

    const link = `http://${host}/section2/${compressedData}`;

    setSharedLink(link);

    setShowModal(true);
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2>Members</h2>
          {renderUserData()}
        </div>
        <div className={styles.rightContent}>
          <h2>결과 화면</h2>
          <div className={styles.savedDataContainer}>
            {renderCompatibilityResult()}
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.shareButton} onClick={handleShareLink}>
          링크 공유
        </button>
        {/* isLoggedIn 상태에 따라 버튼을 렌더링합니다 */}
        {isLoggedIn && (
          <button className={styles.saveButton} onClick={() => {}}>
            저장하기
          </button>
        )}
        <button className={styles.goBackButton} onClick={handleGoBack}>
          처음화면으로 돌아가기
        </button>
      </div>

      {showModal && (
        <LinkModal
          sharedLink={sharedLink}
          handleCopyLink={handleCopyLink}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Result;
