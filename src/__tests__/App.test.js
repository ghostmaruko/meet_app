import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

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

describe("<App /> component", () => {
  test("renders event list", () => {
    render(<App events={mockEvents} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  test("renders CitySearch input", () => {
    render(<App events={mockEvents} />);
    const input = screen.getByPlaceholderText(/search for a city/i);
    expect(input).toBeInTheDocument();
  });

  test("renders correct number of events in EventList", () => {
    render(<App events={mockEvents} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(mockEvents.length);
  });
});
