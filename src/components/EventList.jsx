import React, { useState } from "react";
import PropTypes from "prop-types";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events.map((event) => (
        <EventItem key={String(event.id)} event={event} />
      ))}
    </ul>
  );
};

const EventItem = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event-item">
      <h3>{event.summary}</h3>
      <p>
        {event.start?.dateTime
          ? new Date(event.start.dateTime).toLocaleString()
          : ""}
      </p>
      <p>{event.location}</p>

      <div className="event-actions">
        <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
          View Event
        </a>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="show-details-btn"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showDetails && <p>{event.description}</p>}
    </li>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      summary: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      start: PropTypes.object,
      htmlLink: PropTypes.string,
    })
  ).isRequired,
};

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    summary: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    start: PropTypes.object,
    htmlLink: PropTypes.string,
  }).isRequired,
};

export default EventList;
