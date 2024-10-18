import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    // Timer logic here
  }, []);

  return <span id="watch">{time}</span>;
};

export default Timer;
