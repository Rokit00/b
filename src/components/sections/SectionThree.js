// SectionThree.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OpinionBarChart from "../../hook/OpinionBarChart";
import styles from "./SectionThree.module.css";
import axios from "axios";


const SectionThree = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(()=>{
    axios
    .get("http://localhost:8080/post")
    .then((result)=>{ 
      setPostList(result.data)})
  })

  const handler = ()=>{navigate('/lists');}


  return (
    <div className={styles.main}>
      <h1>토론에 참여해보세요</h1>
      <h1>재미있는 토론이 기다리고 있어요</h1>
      {postList.map((post, i)=>(
        <div className={styles.main}>
       <h2>{post.title}</h2>   
      <OpinionBarChart optionA={post.optionA} optionB={post.optionB}/> 

      </div> 
      ))}
      
      <button className={styles.button} onClick={handler}>
        참여하기
      </button>
    </div>
  );
};

export default SectionThree;
