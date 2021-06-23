import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../../src/pages";

describe("Page - Test The Home Page Component", () => {
  beforeEach(() => {
    render(<Home />);
    process.env = Object.assign(process.env, {
      NEXT_PUBLIC_FILTER_KEYS: "name, description",
    });
  });

  it("should have an search input", () => {
    expect(
      screen.getByLabelText("Search and filter products...")
    ).toBeInTheDocument();
  });

  // TODO: Add more tests...

  // it("should have exactly 1 `main` section", () => {
  //   // The getByRole will error if there are less or more than 1 element found
  //   screen.debug();
  //   // expect(screen.("main").type()).toBe("main");
  // });

  // it("the search field should have a placholder with text", () => {
  //   const searchField = wrapper.find("input");
  //   expect(searchField.props().placeholder).toBe(
  //     "Search and filter products..."
  //   );
  // });

  // it("can get static props, allProducts", () => {
  //   getStaticProps().then((data) => {
  //     expect(data).toBeDefined();
  //     expect(data.props.allProducts).toBeDefined();
  //   });
  // });

  // it("can get static props, filtered keys from .env varible", () => {
  //   const expected = {
  //     props: { filterKeys: ["name", "description"] },
  //   };
  //   getStaticProps().then((data) => {
  //     expect(data.props.filterKeys).toBeDefined();
  //     expect(data.props.filterKeys).toMatchObject(expected.props.filterKeys);
  //   });
  // });
});
