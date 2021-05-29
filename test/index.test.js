import { render } from "@testing-library/react";
import Home, { addAwesome } from "../src/pages/index";

// `describe` is not required, but it helps the tests read nicely
describe("The Home Page Component", () => {
  // Each test for the component will get an `it` block
  it("should have exactly 1 `main` section", () => {
    // The getByRole will error if there are less or more than 1 element found
    const { getByRole } = render(<Home />);
    const main = getByRole("main");

    expect(main).toBeInTheDocument();
  });
});

describe("Test add function", () => {
  test("Test add function...", () => {
    expect(addAwesome(1, 2)).toBe(3);
  });
});
