import React from "react";
import styles from "./Input.module.css";

const Input = ({
  name,
  handleNameChange,
  handleDelete,
  selectedImageIndexes,
  images,
  handleImageClick,
  handleSave,
  renderSavedData,
  handleShowResult,
  mbtiTexts,
}) => {
  return (
    <div className={styles.content}>
      <div className={styles["mbti-check-heading"]}>
        {" "}
        <span> MBTI &nbsp; Check </span>
      </div>

      <div className={styles.main}>
        <div className={styles["mbti-check-left-container"]}>
          <div className={styles["left-content"]}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="NAME"
            /><button onClick={handleSave}>ADD</button>
            <div className={styles["text-grid"]}>
              {mbtiTexts.map((text, textIndex) => (
                <span
                  key={textIndex}
                  className={`${styles[text]} ${
                    selectedImageIndexes[Math.floor(textIndex / 2)] ===
                    textIndex
                      ? `${styles.selected}`
                      : ""
                  }`}
                  onClick={() =>
                    handleImageClick(Math.floor(textIndex / 2), textIndex)
                  }
                >
                  {text}
                </span>
              ))}
            </div>
          </div>          
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["right-content"]}>          
            <div className={styles["result-data"]}>{renderSavedData()}</div>
            <button className={styles["result-btn"]} onClick={handleShowResult}>
            GO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
