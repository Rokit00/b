import React from "react";
import mainImage from "../../assets/Chemi.png"; // 이미지 파일 임포트
import styles from "./Start.module.css"; // Start 컴포넌트에 적용할 CSS 스타일 임포트

const Start = ({ handleStart }) => {
  return (
    // Start 컴포넌트의 주요 컨테이너
    <div className={styles.content}>
      {/* 왼쪽 컨텐츠: 로고 이미지 */}
      <div className={styles["left-content"]}>
        <img src={mainImage} alt="Logo" />{" "}
        {/* mainImage 변수에 저장된 이미지 표시 */}
      </div>
      {/* 오른쪽 컨텐츠: 제목, 설명, 시작하기 버튼 */}
      <div className={styles["right-content"]}>
        <h1>케미 확인하기</h1> {/* 제목 */}
        <p>
          상대방과의 얼마나 잘맞는지 궁금한가요? <br></br>지금 바로 결과를
          확인해 보세요.
        </p>{" "}
        {/* 설명 */}
        {/* 시작하기 버튼, 'handleStart' 함수 실행 */}
        <button onClick={handleStart}>시작하기</button>{" "}
      </div>
    </div>
  );
};

export default Start;
