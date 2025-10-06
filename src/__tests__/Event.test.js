import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";

const mockEvent = {
  id: 1,
  summary: "Learn JavaScript",
  created: "2020-05-19T19:17:46.000Z",
  location: "London, UK",
  description:
    "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London?"
};

describe("<Event /> component", () => {
  test("expands to show details when button clicked", () => {
    render(<Event event={mockEvent} />);
    const button = screen.getByRole("button", { name: /show details/i });

    // Prima i dettagli non sono visibili
    expect(
      screen.queryByText(
        /have you wondered how you can ask google to show you the list/i
      )
    ).not.toBeInTheDocument();

    // Click su Show Details
    fireEvent.click(button);

    // Ora i dettagli sono visibili
    expect(
      screen.getByText(
        /have you wondered how you can ask google to show you the list/i
      )
    ).toBeInTheDocument();

    // Il bottone ora dice Hide Details
    expect(button).toHaveTextContent(/hide details/i);
  });
});
