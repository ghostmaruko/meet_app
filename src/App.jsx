// src/App.jsx
import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { InfoAlert, WarningAlert, ErrorAlert } from "./components/Alert";
import { getEvents } from "./api"; // usa la funzione con offline support
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  // Ottieni lista unica di città dai dati
  const allLocations = [...new Set(events.map((event) => event.location))];

  // Filtra eventi in base alla città selezionata
  const filteredEvents = selectedCity
    ? events.filter((event) => event.location === selectedCity)
    : events;

  const handleCitySelect = (city) => setSelectedCity(city);
  const handleNumberChange = (num) => setNumberOfEvents(num);

  // Carica eventi e aggiorna warning offline
  useEffect(() => {
    const fetchData = async () => {
      if (!navigator.onLine) {
        setWarningAlert("Sei offline: eventi caricati dalla cache");
      } else {
        setWarningAlert(""); // cancella messaggio se online
      }

      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Errore caricamento eventi:", error);
        setErrorAlert("Impossibile caricare eventi");
      }
    };

    fetchData();
  }, [selectedCity, numberOfEvents]);

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
