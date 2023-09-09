// SearchResults.js
import React from "react";
import Card from "./card/Card";
import SortSelect from "./SortSelect";
import styles from "./SearchResults.module.css";

const SearchResults = ({ results, onSortChange }) => {
  return (
    <div className={styles.fixedWidthContainer}>
      <h2>검색 결과</h2>
      <div className={styles.sortSelectContainer}>
        <SortSelect onSortChange={onSortChange} />
      </div>
      <div className={styles.cardRow}>
        {results.map((debate) => {
          return <MemoizedCard key={debate.id} debate={debate} />;
        })}
      </div>
    </div>
  );
};

const MemoizedCard = React.memo(Card);

export default SearchResults;
