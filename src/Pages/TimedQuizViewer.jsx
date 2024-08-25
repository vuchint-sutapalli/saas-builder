import React from "react";
import CountdownTimer from "../components/Timer";

const TimedQuizViewer = ({ onTimeUp }) => {
  const initialTime = 400;

  const handleFiveMinutesRemain = () => {
    // You can implement any specific behavior for when 5 minutes remain
    console.log("5 minutes remaining!");
  };

  return (
    <div className="timed-quiz-viewer">
      <CountdownTimer
        initialTime={initialTime}
        onTimeUp={onTimeUp}
        onFiveMinutesRemain={handleFiveMinutesRemain}
      />
    </div>
  );
};

export default TimedQuizViewer;
