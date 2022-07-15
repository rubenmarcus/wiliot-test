export const formattedTime = (time: number): string => {
  const date = new Date(time * 1000);

  const hours = date.getHours();

  const minutes = "0" + date.getMinutes();

  const seconds = "0" + date.getSeconds();

  const formattedTime =
    hours + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);

  return formattedTime;
};
