import { render } from "@testing-library/react";
import App from "../App";

test("renders loading message initially", () => {
  const { getByText } = render(<App />);
  const loadingText = getByText("loading...");
  expect(loadingText).toBeInTheDocument();
});
