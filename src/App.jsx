// src/App.jsx
import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { InfoAlert, WarningAlert, ErrorAlert } from "./components/Alert";
import { getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const [allLocations, setAllLocations] = useState([]);

  // Carica eventi e città
  const fetchData = async () => {
    try {
      const result = await getEvents();
      setEvents(result);

      const locations = [...new Set(result.map((event) => event.location))];
      setAllLocations(locations);
    } catch (error) {
      setErrorAlert("Errore nel caricamento degli eventi.");
    }
  };

  // Gestione offline/online e warning alert
  useEffect(() => {
    if (!navigator.onLine) {
      setWarningAlert("Sei offline: eventi caricati dalla cache");
      // Nascondi il warning dopo 3 secondi
      const timer = setTimeout(() => setWarningAlert(""), 3000);
      return () => clearTimeout(timer);
    } else {
      setWarningAlert("");
    }

    fetchData();
  }, [selectedCity, numberOfEvents]);

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
        {infoAlert && <InfoAlert text={infoAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
      </div>

      <CitySearch
        allLocations={allLocations}
        setInfoAlert={setInfoAlert}
        onCitySelect={handleCitySelect}
      />

      <NumberOfEvents
        defaultNumber={numberOfEvents}
        onNumberChange={handleNumberChange}
        setWarningAlert={setWarningAlert}
        setErrorAlert={setErrorAlert}
      />

      <EventList events={filteredEvents.slice(0, numberOfEvents)} />
    </div>
  );
};

export default App;
