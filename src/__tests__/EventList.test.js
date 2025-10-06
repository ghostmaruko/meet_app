import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "../components/EventList";
import Event from "../components/Event";

// Mock degli eventi
const mockEvents = [
  {
    id: 1,
    summary: "Learn JavaScript",
    created: "2020-05-19T19:17:46.000Z",
    location: "London, UK",
    description:
      "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London?"
  },
  {
    id: 2,
    summary: "React Workshop",
    created: "2020-06-10T14:00:00.000Z",
    location: "Berlin, DE",
    description: "Learn React from scratch in this hands-on workshop."
  }
];

describe("<EventList /> component", () => {
  test('renders a list with role="list"', () => {
    render(<EventList events={mockEvents} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  test("renders correct number of events", async () => {
    render(<EventList events={mockEvents} />);
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(mockEvents.length);
  });

  test("can show and hide event details", async () => {
    render(<EventList events={mockEvents} />);

    // Trova il pulsante "Show Details" del primo evento
    const showButtons = screen.getAllByRole("button", { name: /show details/i });
    fireEvent.click(showButtons[0]);

    // Controlla che i dettagli siano visibili
    expect(
      screen.getByText(
        /have you wondered how you can ask google to show you the list/i
      )
    ).toBeInTheDocument();

    // Controlla il cambio del testo del bottone
    const hideButton = screen.getByRole("button", { name: /hide details/i });
    fireEvent.click(hideButton);

    // I dettagli devono sparire
    expect(
      screen.queryByText(
        /have you wondered how you can ask google to show you the list/i
      )
    ).not.toBeInTheDocument();
  });
});
