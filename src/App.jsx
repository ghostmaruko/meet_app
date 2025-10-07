import React, { useState } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";

const App = ({ events = [], allLocations = [] }) => {
  const [query, setQuery] = useState("");
  const [number, setNumber] = useState(32);

  const handleCitySelect = (city) => {
    setQuery(city);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} onCitySelect={handleCitySelect} />
      <NumberOfEvents defaultNumber={number} onNumberChange={handleNumberChange} />
      <EventList events={events} />
    </div>
  );
};

export default App;
