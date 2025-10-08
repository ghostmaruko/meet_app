import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({ defaultNumber = 32, onNumberChange }) => {
  const [number, setNumber] = useState(defaultNumber);

  useEffect(() => {
    onNumberChange(number);
  }, [number, onNumberChange]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumber(value);
    }
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

NumberOfEvents.propTypes = {
  defaultNumber: PropTypes.number,
  onNumberChange: PropTypes.func.isRequired,
};

export default NumberOfEvents;
