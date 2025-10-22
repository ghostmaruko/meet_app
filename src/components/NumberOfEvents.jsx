import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({
  defaultNumber = 32,
  onNumberChange,
  setWarningAlert,
  setErrorAlert,
}) => {
  const [number, setNumber] = useState(defaultNumber);

  useEffect(() => {
    onNumberChange(number);
  }, [number, onNumberChange]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      setErrorAlert("Please enter a valid number.");
      setWarningAlert("");
      return;
    }

    if (value <= 0) {
      setWarningAlert("Please enter a number greater than zero.");
      setErrorAlert("");
      return;
    }

    if (value > 100) {
      setErrorAlert("Number too large. Please enter 100 or less.");
      setWarningAlert("");
      return;
    }

    setErrorAlert("");
    setWarningAlert("");
    setNumber(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
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
  setWarningAlert: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;
