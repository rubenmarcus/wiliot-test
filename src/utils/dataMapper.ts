import { formattedTime } from "./formatTime";

export const MappedRealData = (data: any) => {
  let p1Temperature: any = [];
  let p2Temperature: any = [];
  return data.map((data: any) => {
    if (data.id === 1) {
      if (data.temperature > 0) {
        p1Temperature = [...p1Temperature, data.temperature];
      }
    }

    if (data.id === 2) {
      if (data.temperature > 0) {
        p2Temperature = [...p2Temperature, data.temperature];
      }
    }

    // console.log(mappedData, "m1");

    return {
      timestamp: formattedTime(data.timestamp),
      p1Temperature: p1Temperature,
      p2Temperature: p2Temperature,
      id: data.id,
    };
  });
};
