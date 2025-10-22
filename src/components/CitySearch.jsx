import React, { useState } from "react";
import PropTypes from "prop-types";

const CitySearch = ({ allLocations = [], onCitySelect, setInfoAlert }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredSuggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );
    setSuggestions(filteredSuggestions);

    let infoText = "";
    if (filteredSuggestions.length === 0) {
      infoText = "We cannot find the city you’re looking for. Please try another city.";
    }
    setInfoAlert(infoText);
    onCitySelect(value);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    onCitySelect(value);
    setInfoAlert("");
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
          <li
            key="all"
            role="option"
            onClick={() => handleItemClicked({ target: { textContent: "" } })}
          >
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
  setInfoAlert: PropTypes.func.isRequired,
};

export default CitySearch;
