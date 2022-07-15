import { useEffect, useState } from "react";
import { WEBSOCKET_API_BASEURL } from "../config/consts";
import { AppData, MappedAppData, WebSocketData } from "../types/types";
import { MappedRealData } from "../utils/dataMapper";
import { formattedTime } from "../utils/formatTime";

export const useWebSocketConnection = () => {
  const [appData, setAppData] = useState<AppData[]>([]);
  const [realData, setRealData] = useState<MappedAppData[]>([]);
  const [firstProductData, setFirstProductData] = useState<AppData[]>([]);
  const [secondProductData, setSecondProductData] = useState<AppData[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_API_BASEURL);

    ws.addEventListener("open", (event) => {
      setConnectionStatus(ws.readyState);
    });

    ws.addEventListener("close", (event) => {
      setConnectionStatus(ws.readyState);
    });

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);

      try {
        if (data) {
          const finalData = data.filter(
            (data: WebSocketData) => data.data <= 100
          );

          const mappedRealData = MappedRealData(finalData);

          if (realData && mappedRealData.length > 1) {
            const newRealData = [...realData, ...MappedRealData(finalData)];

            console.log(newRealData, "newRealData");

            if (newRealData.length > 10) {
              newRealData.splice(0, 2);
              newRealData.length = 10;
              setRealData(newRealData);
            } else {
              setRealData(newRealData);
            }
          }

          const p1Data = finalData
            .filter((data: WebSocketData) => (data.id = 1))
            .map((data: WebSocketData) => {
              return {
                timestamp: formattedTime(data.timestamp),
                temperature: data.temperature,
              };
            });

          const p2Data = finalData
            .filter((data: any) => (data.id = 2))
            .map((data: WebSocketData) => {
              return {
                timestamp: formattedTime(data.timestamp),
                temperature: data.temperature,
              };
            });

          const p1newData = [...firstProductData, ...p1Data];
          const p2newData = [...secondProductData, ...p2Data];

          const newData = [...appData, ...finalData];

          if (p1newData.length > 5) {
            p1newData.splice(0, 1);
            p1newData.length = 5;
            setFirstProductData(p1newData);
          } else {
            setFirstProductData(p1newData);
          }

          if (p2newData.length > 5) {
            p2newData.splice(0, 1);
            p2newData.length = 5;
            setSecondProductData(p2newData);
          } else {
            setSecondProductData(p2newData);
          }

          if (newData.length > 20) {
            newData.splice(0, 5);
          }

          setAppData(newData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => ws.close();
  }, [appData, firstProductData, secondProductData, realData]);

  return {
    secondProductData,
    firstProductData,
    connectionStatus,
    realData,
  };
};
