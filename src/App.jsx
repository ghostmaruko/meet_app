import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { InfoAlert, WarningAlert, ErrorAlert } from "./components/Alert";
import { getEvents } from "./api";
import CityEventsChart from "./components/CityEventsChart";
import CityPieChart from "./components/CityPieChart";
import EventParticipantsChart from "./components/EventParticipantsChart";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [selectedCity, setSelectedCity] = useState("");
  const [allLocations, setAllLocations] = useState([]);

  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // === Fetch eventi e gestisci connessione ===
  const fetchData = async () => {
    try {
      const result = await getEvents();
      if (result?.length) {
        setEvents(result);
        const locations = [...new Set(result.map((event) => event.location))];
        setAllLocations(locations);
      } else {
        setInfoAlert("Nessun evento trovato.");
      }
    } catch (error) {
      console.error(error);
      setErrorAlert("Errore nel caricamento degli eventi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.onLine) {
      setWarningAlert(
        "Sei offline: gli eventi potrebbero non essere aggiornati."
      );
    } else {
      setWarningAlert("");
    }
    fetchData();
  }, [selectedCity, numberOfEvents]);

  // === Filtra eventi per città ===
  const filteredEvents = selectedCity
    ? events.filter((event) => event.location === selectedCity)
    : events;

  // === Handlers ===
  const handleCitySelect = (city) => setSelectedCity(city);
  const handleNumberChange = (num) => setNumberOfEvents(num);

  return (
    <div className="App">
      {/* === Alerts === */}
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
      </div>

      {/* === Controlli di ricerca === */}
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

      {/* === Stato di caricamento === */}
      {isLoading && <p className="loading-text">Caricamento eventi...</p>}

      {/* === Grafici + Lista eventi === */}
      {!isLoading && filteredEvents.length > 0 && (
        <>
          <div className="charts-container">
            <div>
              <h3 className="chart-title">Eventi per Città</h3>
              <CityPieChart events={events} />
            </div>

            <div>
              <h3 className="chart-title">Distribuzione Eventi</h3>
              <CityEventsChart events={events} />
            </div>

            <div>
              <h3 className="chart-title">Partecipanti per Evento</h3>
              <EventParticipantsChart events={events} />
            </div>
          </div>

          <EventList events={filteredEvents.slice(0, numberOfEvents)} />
        </>
      )}

      {/* === Nessun evento trovato === */}
      {!isLoading && filteredEvents.length === 0 && (
        <p className="no-events-text">
          Nessun evento disponibile per questa città.
        </p>
      )}
    </div>
  );
};

export default App;
