import React from "react";
import { calculatePercentage } from "../utils/calculatePercent";
import styles from "./OpinionBarChart.module.css";

const OpinionBarChart = ({ optionA, optionB }) => {
  const { percentageA, percentageB } = calculatePercentage(optionA, optionB);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.choicesContainer}>
      </div>
      <div className={styles.barContainer}>
        <span>A&nbsp;{optionA}&nbsp;</span>
        <span>B&nbsp;{optionB}&nbsp;</span>
        <div className={styles.barA} style={{ width: `${percentageA}%` }}>
          <span className={styles.percentageText}>{percentageA}%</span>
        </div>
        <div className={styles.barB} style={{ width: `${percentageB}%` }}>
          <span className={styles.percentageText}>{percentageB}%</span>
        </div>
      </div>
    </div>
  );
};

export default OpinionBarChart;
