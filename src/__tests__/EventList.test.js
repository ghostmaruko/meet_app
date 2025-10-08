import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import EventList from "../components/EventList";
import App from "../App";
import mockData from "../mock-data"; // Import corretto del tuo mock-data

// Assicuriamoci che gli id siano stringhe per evitare warning di PropTypes
const formattedMockData = mockData.map(event => ({
  ...event,
  id: String(event.id || event.etag || Math.random()),
}));

describe("<EventList /> component", () => {
  test('renders a list with role="list"', () => {
    render(<EventList events={formattedMockData.slice(0, 2)} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    render(<EventList events={formattedMockData.slice(0, 2)} />);
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  test("can show and hide event details", async () => {
    render(<EventList events={formattedMockData.slice(0, 1)} />);

    // Trova il pulsante "Show Details"
    const showButton = screen.getByRole("button", { name: /show details/i });
    fireEvent.click(showButton);

    // Controlla che i dettagli siano visibili
    expect(screen.getByText(/have you wondered/i)).toBeInTheDocument();

    // Controlla il cambio del testo del bottone
    const hideButton = screen.getByRole("button", { name: /hide details/i });
    fireEvent.click(hideButton);

    // I dettagli devono sparire
    expect(screen.queryByText(/have you wondered/i)).not.toBeInTheDocument();
  });

  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0); // oppure `.toBe(32);`
    });
  });
});
