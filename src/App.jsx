import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import { getEvents } from "./api";

const App = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getEvents().then((events) => {
      setAllEvents(events);
      setEvents(events);
      setLocations([...new Set(events.map((event) => event.location))]);
    });
  }, []);

  // Funzione chiamata da CitySearch
  const handleCitySelect = (city) => {
    const filtered =
      city === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === city);
    setEvents(filtered);
  };

  return (
    <>
      <CitySearch allLocations={locations} onCitySelect={handleCitySelect} />
      <EventList events={events} />
    </>
  );
};

export default App;
