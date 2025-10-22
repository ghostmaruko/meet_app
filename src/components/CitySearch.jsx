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
    setShowSuggestions(true);
  };

  const handleItemClicked = (event) => {
    const value = event.target.dataset.value;
    setQuery(value);
    onCitySelect(value === "all" ? "" : value);
    setInfoAlert("");
    setShowSuggestions(false);
  };

  const handleSeeAllClick = () => {
    setQuery("");
    onCitySelect("");
    setInfoAlert("");
  };

  return (
    <div id="city-search" className="city-search-container">
      <input
        type="text"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        aria-label="Search for a city"
      />
      <button
        type="button"
        className="see-all-btn"
        onClick={handleSeeAllClick}
      >
        See all cities
      </button>

      {showSuggestions && query && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              role="option"
              data-value={suggestion}
              onClick={handleItemClicked}
              tabIndex="0"
            >
              {suggestion}
            </li>
          ))}
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
