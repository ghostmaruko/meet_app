import React, { useState, useEffect } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const EventParticipantsChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      const formattedData = events.map((event) => ({
        event: event.summary,
        participants: event.attendees ? event.attendees.length : 0,
      }));
      setData(formattedData);
    }
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="category" dataKey="event" name="Event" />
        <YAxis type="number" dataKey="participants" name="Participants" />
        <Tooltip />
        <Scatter data={data} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default EventParticipantsChart;
