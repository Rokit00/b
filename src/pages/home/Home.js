// Home.js
import React, { useRef, useState, useEffect } from "react";
import SectionOne from "./sections/SectionOne";
import SectionTwo from "./sections/SectionTwo";
import SectionThree from "./sections/SectionThree";
import axios from "axios";
import { calculatePercentage } from "../../utils/calculatePercent";
import NavBar from "../../components/nav_bar/NavBar";

const Home = () => {
  const sectionTwoRef = useRef(null);
  const [sharedData, setSharedData] = useState(null);
  const [randomDebate, setRandomDebate] = useState(null);
  const [comments, setComments] = useState([]);
  const handleScrollToSectionTwo = () => {
    sectionTwoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchRandomDebate() {
      try {
        const response = await axios.get("/post/lists");
        const debates = response.data;
        const randomIndex = Math.floor(Math.random() * debates.length);
        const selectedDebate = debates[randomIndex];

        const commentsResponse = await axios.get(
          `/comment/${selectedDebate.id}`
        );

        setRandomDebate(selectedDebate);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching random debate", error);
      }
    }

    fetchRandomDebate();
  }, []);

  const opinionACount = comments.filter(
    (comment) => comment.selectOption === "A"
  ).length;
  const opinionBCount = comments.filter(
    (comment) => comment.selectOption === "B"
  ).length;

  const { percentageA, percentageB } = calculatePercentage(
    opinionACount,
    opinionBCount
  );

  return (
    <div>
      <NavBar />
      <SectionOne handleScrollToSectionTwo={handleScrollToSectionTwo} />
      <div ref={sectionTwoRef}>
        <SectionTwo setSharedData={setSharedData} />
      </div>
      {sharedData && (
        <div className="sharedData">
          <h2>Shared Data:</h2>
          <pre>{JSON.stringify(sharedData, null, 2)}</pre>
        </div>
      )}
      {randomDebate && (
        <SectionThree
          debate={randomDebate}
          percentageA={percentageA}
          percentageB={percentageB}
        />
      )}
    </div>
  );
};

export default Home;
