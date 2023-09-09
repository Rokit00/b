// useSharedLogic.js
import { useState, useEffect } from "react";
import { mbtiToAlphabet } from "../utils/compatibility";
import "./useSharedLogic.css";
import styles from "../components/Input.module.css";

const useSharedLogic = (satellites, initialData) => {
  const [name, setName] = useState("");
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([
    -1, -1, -1, -1,
  ]);
  const [showContent, setShowContent] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [savedData, setSavedData] = useState([]);

  const mbtiTexts = ["I", "E", "S", "N", "F", "T", "P", "J"];
  useEffect(() => {
    if (initialData) {
      const decodedData = decodeURIComponent(initialData);
      const parsedData = JSON.parse(decodedData);

      // 링크 데이터로 초기 데이터 초기화
      setName(parsedData.name || "");
      setSelectedImageIndexes(parsedData.mbti || [-1, -1, -1, -1]);
      setShowResult(true); // Result.js로 바로 이동하도록 설정
    }
  }, [initialData]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageClick = (rowIndex, imageIndex) => {
    const imageGroups = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ];

    const updatedSelectedImageIndexes = [...selectedImageIndexes];

    imageGroups[rowIndex].forEach((i) => {
      if (i !== imageIndex && updatedSelectedImageIndexes.includes(i)) {
        const index = updatedSelectedImageIndexes.indexOf(i);
        if (index > -1) {
          updatedSelectedImageIndexes[index] = -1;
        }
      }
    });

    updatedSelectedImageIndexes[rowIndex] = imageIndex;
    setSelectedImageIndexes(updatedSelectedImageIndexes);
  };

  const handleStart = () => {
    setShowContent(true);
  };

  const handleSave = () => {
    if (name.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (selectedImageIndexes.includes(-1)) {
      alert("올바른 MBTI 타입을 선택해주세요.");
      return;
    }

    const mbtiType = mbtiToAlphabet(selectedImageIndexes);

    const newData = {
      name: name,
      mbti: selectedImageIndexes,
      mbtiType: mbtiType,
    };
    setSavedData([...savedData, newData]);
    setName("");
    setSelectedImageIndexes([-1, -1, -1, -1]);
  };
  const handleDelete = (indexToDelete) => {
    const updatedData = savedData.filter((_, index) => index !== indexToDelete);
    setSavedData(updatedData);
  };
  const handleShowResult = () => {
    if (savedData.length === 0) {
      alert("MBTI 타입을 입력해주세요.");
      return;
    } else if (savedData.length === 1) {
      alert("2명 이상의 정보를 입력해주세요");
      return;
    }

    setShowLoading(true);
    setTimeout(() => {
      setShowResult(true);
      setShowLoading(false);
    }, 5000);
  };

  const areAllImagesLoaded = () => {
    return imagesLoaded === satellites.length;
  };

  const renderSelectedTexts = () => {
    return selectedImageIndexes.map((textIndex, rowIndex) => (
      <div key={rowIndex} className="result-texts">
        {textIndex !== -1 && (
          <span className={rowIndex + "-" + textIndex}>
            {mbtiTexts[textIndex]}
          </span>
        )}
      </div>
    ));
  };

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);

    if (imagesLoaded + 1 === satellites.length) {
      setAllImagesLoaded(true);
    }
  };

  const renderSavedData = () => {
    return savedData.map((data, dataIndex) => (
      <div key={dataIndex} className={styles["data-row"]}>
        <div className={styles["saved-data"]}>
          <p>이름: {data.name}</p>
          <div className={styles["result-texts"]}>
            {data.mbti.map((textIndex, rowIndex) => {
              const mbtiType = mbtiTexts[textIndex];
              return (
                <span
                  key={rowIndex}
                  className={`${styles["result-text"]} ${styles[mbtiType]} ${styles["selected"]}`}
                >
                  {mbtiType}
                </span>
              );
            })}
          </div>
        </div>
        <button
          className={styles["delete-button"]}
          onClick={() => handleDelete(dataIndex)}
        >
          x
        </button>
      </div>
    ));
  };

  return {
    name,
    setName,
    selectedImageIndexes,
    setSelectedImageIndexes,
    showContent,
    setShowContent,
    showResult,
    setShowResult,
    showLoading,
    setShowLoading,
    savedData,
    setSavedData,
    handleNameChange,
    handleImageClick,
    handleStart,
    handleSave,
    handleDelete,
    handleShowResult,
    mbtiTexts,
    renderSelectedTexts,
    renderSavedData,
    areAllImagesLoaded,
    allImagesLoaded,
    handleImageLoad,
  };
};

export default useSharedLogic;
