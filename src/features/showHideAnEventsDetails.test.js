import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppComponent;
  let EventListItems;

  // Scenario 1: Event element is collapsed by default
  test("Event element is collapsed by default", ({ given, when, then }) => {
    given("the list of events has been loaded", () => {
      AppComponent = render(<App />);
      EventListItems = AppComponent.getAllByRole("listitem");
    });

    when("the user hasn’t clicked the “Show details” button", () => {
      // nessuna azione richiesta
    });

    then("the event element is collapsed by default", () => {
      const details = within(EventListItems[0]).queryByText((content) =>
        content.includes("Javascript offers interactivity")
      );
      expect(details).not.toBeInTheDocument();
    });
  });

  // Scenario 2: User can expand an event to see its details
  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    given("the list of events has been loaded", () => {
      AppComponent = render(<App />);
      EventListItems = AppComponent.getAllByRole("listitem");
    });

    when("the user clicks on the “Show Details” button", () => {
      const showButton = within(EventListItems[0]).getByText(/Show Details/i);
      fireEvent.click(showButton);
    });

    then("the event element expands showing the event details", async () => {
      const details = await within(EventListItems[0]).findByText((content) =>
        content.includes("Javascript offers interactivity")
      );
      expect(details).toBeInTheDocument();
    });
  });

  // Scenario 3: User can collapse an event to hide its details
  test("User can collapse an event to hide its details", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the list of events has been loaded", () => {
      AppComponent = render(<App />);
      EventListItems = AppComponent.getAllByRole("listitem");
    });

    and("the event element is expanded showing details", () => {
      const showButton = within(EventListItems[0]).getByText(/Show Details/i);
      fireEvent.click(showButton);
    });

    when("the user clicks on the “Hide Details” button", () => {
      const hideButton = within(EventListItems[0]).getByText(/Hide Details/i);
      fireEvent.click(hideButton);
    });

    then("the event element collapses hiding the event details", () => {
      const details = within(EventListItems[0]).queryByText((content) =>
        content.includes("Javascript offers interactivity")
      );
      expect(details).not.toBeInTheDocument();
    });
  });
});
