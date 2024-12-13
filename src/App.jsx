import { useEffect, useState } from "react";
import Description from "./components/Description";
import Options from "./components/Options";
import Feedback from "./components/Feedback";

function App() {
  const [feedObject, setFeedObject] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const feed = JSON.parse(window.localStorage.getItem("feed"));
    if (feed) {
      setFeedObject(feed);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      window.localStorage.setItem("feed", JSON.stringify(feedObject));
    }
  }, [feedObject, isInitialLoad]);

  const totalFeedback = feedObject.good + feedObject.neutral + feedObject.bad;
  const positivePersent =
    totalFeedback > 0 ? Math.round((feedObject.good / totalFeedback) * 100) : 0;

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setFeedObject({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    } else {
      setFeedObject((prevState) => ({
        ...prevState,
        [feedbackType]: prevState[feedbackType] + 1,
      }));
    }
  };

  return (
    <>
      <Description />
      <Options click={updateFeedback} total={totalFeedback} />
      <Feedback
        feed={feedObject}
        total={totalFeedback}
        positive={positivePersent}
      />
    </>
  );
}

export default App;
