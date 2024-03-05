import React, { useEffect, useState } from "react";
import styles from "./SectionOne.module.css";

const SectionOne = ({ handleScrollToSectionTwo }) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveTextStyles = {
    transform: `translateX(${scrollOffset}%)`
  };

  return (
    <div className={styles.main}>
      <div className={styles.centered}>
      
  <h1 class={styles.effect}>우리 같이 MBTI 궁합 볼까?</h1>
  <h1 class={styles.effect}>NEON effect is</h1>
  <h1 class={styles.effect}>Awesome</h1>

      </div> 
    </div>
  );
};

export default SectionOne;