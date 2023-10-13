import { useState, useEffect } from "react";

const RelativeTime = ({ createdAt }) => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const date = new Date(createdAt);
      const now = new Date();
      const diff = now - date;
      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;

      if (diff < minute) {
        setRelativeTime("just now");
      } else if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        setRelativeTime(`${minutes} m`);
      } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        setRelativeTime(`${hours} h`);
      } else {
        const days = Math.floor(diff / day);
        setRelativeTime(`${days} d`);
      }
    };

    updateRelativeTime();

    const intervalId = setInterval(updateRelativeTime, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return <span>{relativeTime}</span>;
};

export default RelativeTime;
