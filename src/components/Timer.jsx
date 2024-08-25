import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const CountdownTimer = ({ initialTime, onTimeUp, onFiveMinutesRemain }) => {
  const [time, setTime] = useState(initialTime);
  const [prevMoment, setPrevMoment] = useState(dayjs());

  useEffect(() => {
    const updateTime = () => {
      const currentMoment = dayjs();
      const elapsedSeconds = dayjs
        .duration(currentMoment.diff(prevMoment))
        .asSeconds();

      // Adjust the time by the number of actual seconds elapsed
      const remainingTime = Math.max(0, time - elapsedSeconds);
      setTime(remainingTime);
      setPrevMoment(currentMoment);

      // Trigger events based on the new time
      if (remainingTime === 300 && initialTime > 300) {
        onFiveMinutesRemain();
      }
      if (remainingTime <= 0) {
        onTimeUp();
      }
    };

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [time, prevMoment, initialTime, onTimeUp, onFiveMinutesRemain]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return (
    <div className={`timer ${minutes < 5 && hours === 0 ? "warning" : ""}`}>
      {hours > 0 && <span className="hour-container">{hours}:</span>}
      <span className="min-container">
        {minutes.toString().padStart(2, "0")}:
      </span>
      <span className="secs">{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
};

export default CountdownTimer;
