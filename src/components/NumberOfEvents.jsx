import React, { useState } from "react";

const NumberOfEvents = ({ defaultNumber = 32, onNumberChange }) => {
  const [number, setNumber] = useState(defaultNumber);

  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    if (onNumberChange) onNumberChange(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        aria-label="number of events"
        value={number}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberOfEvents;
