//DebateList.js
import React, { useState, useEffect } from "react";
import styles from "./DebateList.module.css";
import axios from "axios";
import { useAuth } from "../../hook/AuthContext";
import { useNavigate } from "react-router-dom";

const DebateList = () => {
  
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(()=>{
    axios
    .get("http://localhost:8080/post")
    .then((result)=>{ 
      setPostList(result.data)})
  }, [])

  return (
    <div className={styles.main}>
<div className={styles.header}>
  <div>최신순</div>
<input
        type="text"
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search"
      />
      <button>search</button>
      <button>Add</button>
      {/* {isLoggedIn && <button onClick={navigate('/newDebate')}>토론 글 쓰기</button>} */}
</div>
      
      <div className={styles.body}>
        
  {postList.map((post, i) => (
    <div key={i} className={styles.section}>
      <h1>{post.title}</h1>
      <p>A {post.optionA}</p>
      <p>VS</p>
      <p>B {post.optionB}</p>
      <p>count: {post.viewCount}</p>
    </div>
  ))}
</div>
    </div>
    
  );
};

export default DebateList;
