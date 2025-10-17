// src/App.jsx
import React, { useState } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import mockData from "./mock-data";
import { InfoAlert } from "./components/Alert";
import "./App.css";

const App = () => {
  const [events] = useState(mockData);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");
  const [infoAlert, setInfoAlert] = useState("");

  // Ottieni lista unica di città
  const allLocations = [...new Set(mockData.map((event) => event.location))];

  // Filtra eventi in base alla città selezionata
  const filteredEvents = selectedCity
    ? events.filter((event) => event.location === selectedCity)
    : events;

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleNumberChange = (num) => {
    setNumberOfEvents(num);
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
      </div>

      <CitySearch
        allLocations={allLocations}
        setInfoAlert={setInfoAlert}
        onCitySelect={handleCitySelect}
      />

      <NumberOfEvents
        defaultNumber={numberOfEvents}
        onNumberChange={handleNumberChange}
      />

      <EventList events={filteredEvents.slice(0, numberOfEvents)} />
    </div>
  );
};

export default App;
