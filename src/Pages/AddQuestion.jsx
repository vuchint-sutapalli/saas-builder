import React from "react";

import TimedQuizViewer from "./TimedQuizViewer";

const AddQuestion = () => {
  return (
    <div>
      AddQuestion
      <TimedQuizViewer
        onTimeUp={() => {
          console.log("times up");
        }}
      />
    </div>
  );
};

export default AddQuestion;
