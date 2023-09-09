// SectionOne.js
import React from "react";
import "./SectionOne.css";

const SectionOne = ({ handleScrollToSectionTwo }) => {
  return (
    <div className="section-one">
      <div className="banner">
        <div className="testtext">
          <span id="logotext">
            WE-ING<hr></hr>
          </span>
        </div>
        <br></br>
        <p className="banner-title">WE-checking</p>
        <p className="banner-info">
          내가 속한 그룹 또는 상대방과의 케미를 확인해보세요
        </p>{" "}
        <button onClick={handleScrollToSectionTwo}>확인하기</button>
        <button onClick={() => (window.location.href = "/Mychemilist")}>
          마이페이지
        </button>
      </div>
    </div>
  );
};

export default SectionOne;
