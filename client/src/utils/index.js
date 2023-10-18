export const aggregateSongsDuration = (songs) => {
  let totalSeconds = 0;
  for (const song of songs) {
    const [minutes, seconds] = song.duration.split(":");
    totalSeconds += parseInt(minutes) * 60 + parseInt(seconds);
  }
  if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes} minutes`;
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours} hours, ${minutes} minutes`;
};

export const trimText = (text) => {
  if (text.length > 10) {
    return text.slice(0, 10) + "...";
  } else {
    return text;
  }
};

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { month: "long", year: "numeric" };
  const formattedDate = dateObject.toLocaleString("en-US", options);
  return formattedDate;
};

export const convertToSeconds = (time) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const convertSecondsToTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
