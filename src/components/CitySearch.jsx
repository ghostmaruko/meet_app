import React, { useState } from "react";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations = [], onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Quando l'utente digita
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredSuggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );
    setSuggestions(filteredSuggestions);

    // chiama anche il parent con la città (utile per filtri live)
    onCitySelect(value);
  };

  // Quando l'utente clicca su una città
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    onCitySelect(value); // passa la città al componente padre (App)
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        aria-label="Search for a city"
      />

      {showSuggestions && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              role="option"
              onClick={handleItemClicked}
              tabIndex="0"
            >
              {suggestion}
            </li>
          ))}
          <li key="all" onClick={() => handleItemClicked({ target: { textContent: "" } })}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string),
  onCitySelect: PropTypes.func.isRequired,
};

export default CitySearch;
