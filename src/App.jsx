import { useEffect, useState } from "react";
import Description from "./components/Description";
import Options from "./components/Options";
import Feedback from "./components/Feedback";
import Notification from "./components/Notification";

function App() {
  const [feedObject, setFeedObject] = useState(() => {
    const savedFeed = window.localStorage.getItem("feed");
    return savedFeed ? JSON.parse(savedFeed) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    window.localStorage.setItem("feed", JSON.stringify(feedObject));
  }, [feedObject]);

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
      {totalFeedback > 0 ? (
        <Feedback
          feed={feedObject}
          total={totalFeedback}
          positive={positivePersent}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
