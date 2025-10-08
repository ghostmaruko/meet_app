import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> Feature 3", () => {
  test("renders input textbox", () => {
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const input = screen.getByRole("spinbutton", { name: /number of events/i });
    expect(input).toBeInTheDocument();
  });

  test("default value is 32", () => {
    render(<NumberOfEvents onNumberChange={() => {}} />);
    const input = screen.getByRole("spinbutton", { name: /number of events/i });
    expect(input.value).toBe("32");
  });

  test("updates value on user input", () => {
    const mockOnNumberChange = jest.fn();

    render(<NumberOfEvents defaultNumber={32} onNumberChange={mockOnNumberChange} />);
    const input = screen.getByRole("spinbutton", { name: /number of events/i });

    fireEvent.change(input, { target: { value: "10" } });

    expect(input.value).toBe("10");
    expect(mockOnNumberChange).toHaveBeenCalledWith(10);
  });
});
