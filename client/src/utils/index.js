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
