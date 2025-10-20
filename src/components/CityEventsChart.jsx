import React, { useState, useEffect } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const CityEventsChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      const getData = () => {
        const data = events.reduce((acc, event) => {
          const city = event.location.split(", ").shift();
          const existingCity = acc.find((item) => item.city === city);
          if (existingCity) {
            existingCity.number++;
          } else {
            acc.push({ city, number: 1 });
          }
          return acc;
        }, []);
        return data;
      };
      setData(getData());
    }
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <ScatterChart
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="city" />
        <YAxis type="number" dataKey="number" name="number of events" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
