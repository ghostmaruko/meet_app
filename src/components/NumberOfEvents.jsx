import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({
  onNumberChange,
  setWarningAlert,
  setErrorAlert,
}) => {
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (number !== "") {
      onNumberChange(number);
    }
  }, [number, onNumberChange]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Se non è un numero → errore
    if (value === "" || isNaN(Number(value))) {
      setErrorAlert("Inserisci un numero valido.");
      setWarningAlert("");
      setNumber("");
      return;
    }

    const numericValue = parseInt(value, 10);

    // Valore <=0 → warning
    if (numericValue <= 0) {
      setWarningAlert("Inserisci un numero maggiore di zero.");
      setErrorAlert("");
      setNumber(numericValue);
      return;
    }

    // Valore troppo grande → errore
    if (numericValue > 100) {
      setErrorAlert("Numero troppo grande. Inserisci 100 o meno.");
      setWarningAlert("");
      setNumber(numericValue);
      return;
    }

    // Tutto valido
    setWarningAlert("");
    setErrorAlert("");
    setNumber(numericValue);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Numero di Eventi:</label>
      <input
        id="number-input"
        type="number"
        placeholder="Inserisci numero"
        value={number}
        onChange={handleChange}
        aria-label="numero di eventi"
        min={1}
        max={100}
      />
    </div>
  );
};

NumberOfEvents.propTypes = {
  onNumberChange: PropTypes.func.isRequired,
  setWarningAlert: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
  
};

export default NumberOfEvents;
