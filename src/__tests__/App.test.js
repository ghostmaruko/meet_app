import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "../App";
import mockData from "../mock-data"; // Import corretto

// Trasformiamo gli id in stringhe per evitare warning PropTypes
const formattedMockData = mockData.map(event => ({
  ...event,
  id: String(event.id || event.etag || Math.random()),
}));

describe("<App /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });

  test("renders events in the EventList", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });

  test("passes 'number of events' state to EventList", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");

    await waitFor(() => {
      const items = within(EventListDOM).queryAllByRole("listitem");
      expect(items.length).toBe(32); // default
    });
  });

  test("user can change number of events displayed", async () => {
    const AppComponent = render(<App />);
    const numberInput = screen.getByRole("spinbutton", { name: /number of events/i });

    // Cambiamo il numero di eventi da 32 a 10
    fireEvent.change(numberInput, { target: { value: 10 } });

    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");

    await waitFor(() => {
      const items = within(EventListDOM).queryAllByRole("listitem");
      expect(items.length).toBe(10);
    });
  });
});
