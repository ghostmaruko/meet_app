import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const CityPieChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const data = events.reduce((acc, event) => {
        const city = event.location.split(", ").shift();
        const existing = acc.find((item) => item.city === city);
        if (existing) existing.value++;
        else acc.push({ city, value: 1 });
        return acc;
      }, []);
      return data;
    };
    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={150}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CityPieChart;
