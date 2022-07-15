import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./App.css";
import { useWebSocketConnection } from "./hooks/useWebSocketConnection";
import { MappedAppData, ProductData } from "./types/types";

function App() {
  const [firstProduct, setFirstProduct] = useState<ProductData>({
    temp: [0],
    time: "0",
  });
  const [secProduct, setSecProduct] = useState<ProductData>({
    temp: [0],
    time: "0",
  });

  const { firstProductData, secondProductData, realData, connectionStatus } =
    useWebSocketConnection();

  useEffect(() => {
    realData.map((data: MappedAppData) => {
      if (data.p1Temperature) {
        const p1Data = {
          temp: data.p1Temperature,
          time: data.timestamp,
        };

        setFirstProduct(p1Data);
      }

      if (data.p2Temperature) {
        const p2Data = {
          temp: data.p2Temperature,
          time: data.timestamp,
        };

        setSecProduct(p2Data);
      }
    });
  }, [realData, setFirstProduct]);

  return (
    <div className="App">
      {connectionStatus === 1 ? (
        <div className="ToastOn"> Connection Opened </div>
      ) : connectionStatus === 3 ? (
        <div className="ToastOff"> Connection Off</div>
      ) : null}
      <div className="dashboard">
        <div className="cards">
          <div className="card">
            P1
            <p>{firstProduct.temp} °C</p>
            <br />
            <p> {firstProduct.time} </p>
          </div>
          <div className="card">
            P2
            <p> {secProduct.temp}°C</p>
            <br />
            <p> {secProduct.time}</p>
          </div>
        </div>

        <section className="dashboard-graphics">
          <h2>Real Time Temperature update for P1 x P2</h2>
          <LineChart
            width={600}
            height={400}
            data={realData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="p1Temperature" stroke="#8884d8" />

            <Line type="monotone" dataKey="p2Temperature" stroke="#009c50" />
          </LineChart>
          <h2>Real Time Temperature update for P1</h2>
          <LineChart
            width={600}
            height={400}
            data={firstProductData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="temperature" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          </LineChart>
          <h2>Real Time Temperature update for P2</h2>
          <LineChart
            width={600}
            height={400}
            data={secondProductData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="temperature" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#009c50" />
          </LineChart>
        </section>
      </div>
    </div>
  );
}

export default App;
