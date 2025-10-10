import React, { useState } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import mockData from "./mock-data";

const App = () => {
  const [events] = useState(mockData);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");

  // Ottieni lista unica di città per i suggerimenti
  const allLocations = [...new Set(mockData.map((event) => event.location))];

  // Applica filtro per città
  const filteredEvents = selectedCity
    ? events.filter((event) => event.location === selectedCity)
    : events;

  // Gestori eventi
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleNumberChange = (num) => {
    setNumberOfEvents(num);
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} onCitySelect={handleCitySelect} />

      <NumberOfEvents
        defaultNumber={numberOfEvents}
        onNumberChange={handleNumberChange}
      />

      <EventList events={filteredEvents.slice(0, numberOfEvents)} />
    </div>
  );
};

export default App;
