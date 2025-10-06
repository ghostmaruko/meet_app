import React, { useState } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";

// Esempio con props.events, altrimenti default vuoto
const App = ({ events = [] }) => {
  const [query, setQuery] = useState("");

  const handleCityChange = (e) => {
    setQuery(e.target.value);
    // eventualmente filtrare eventi in base alla città
  };

  return (
    <div className="App">
      <CitySearch query={query} onChange={handleCityChange} />
      <EventList events={events} />
    </div>
  );
};

export default App;
