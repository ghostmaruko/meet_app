import React from "react";
import { render, within, fireEvent, waitFor } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When the user hasn’t specified a number, 32 is the default", ({
    given,
    when,
    then,
  }) => {
    let AppDOM;
    let EventListItems;

    given("the app is loaded", async () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        EventListItems = within(AppDOM).queryAllByRole("listitem");
      });
    });

    when("the user hasn’t changed the number of events", () => {});

    then("the default number of events displayed should be 32", () => {
      expect(EventListItems.length).toBeLessThanOrEqual(32);
    });
  });

  test("User can change the number of events displayed", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let EventListItems;
    let numberInput;

    given("the app is loaded", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        EventListItems = within(AppDOM).queryAllByRole("listitem");
      });
    });

    when("the user changes the number of events to 10", async () => {
      numberInput = within(AppDOM).queryByRole("spinbutton");
      fireEvent.change(numberInput, { target: { value: 10 } });
      await waitFor(() => {
        EventListItems = within(AppDOM).queryAllByRole("listitem");
      });
    });

    then("the app should display 10 events", () => {
      expect(EventListItems.length).toBeLessThanOrEqual(10);
    });
  });
});
