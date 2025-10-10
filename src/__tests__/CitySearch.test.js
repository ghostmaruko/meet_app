import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";

const allLocations = ["Berlin, Germany", "London, UK", "Madrid, Spain"];

describe("<CitySearch /> component", () => {
  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();

    const CitySearchComponent = render(
      <CitySearch allLocations={allLocations} onCitySelect={() => {}} />
    );

    const cityTextBox = screen.getByPlaceholderText("Search for a city");
    await user.click(cityTextBox);

    const suggestionList = CitySearchComponent.queryByRole("listbox");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();

    render(
      <CitySearch allLocations={allLocations} onCitySelect={() => {}} />
    );

    const cityTextBox = screen.getByPlaceholderText("Search for a city");
    await user.type(cityTextBox, "Berlin");

    const suggestions = screen.getAllByRole("option");
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0]).toHaveTextContent("Berlin");
  });
});
