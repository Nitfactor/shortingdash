import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Shorting Dash header", () => {
  render(<App />);
  expect(screen.getByText(/SHORTING DASH/i)).toBeInTheDocument();
});
