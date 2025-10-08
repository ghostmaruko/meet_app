import React, { useState } from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import mockData from "./mock-data";

const App = () => {
  const [events, setEvents] = useState(mockData);
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleNumberChange = (num) => {
    setNumberOfEvents(num);
  };

  return (
    <div className="App">
      <div id="number-of-events">
        <NumberOfEvents
          defaultNumber={numberOfEvents}
          onNumberChange={handleNumberChange}
        />
      </div>
      <EventList events={events.slice(0, numberOfEvents)} />
    </div>
  );
};

export default App;
