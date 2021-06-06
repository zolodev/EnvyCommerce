import { shallow } from "enzyme";
import Home from "../src/pages/index";

const wrapper = shallow(<Home />);

// `describe` is not required, but it helps the tests read nicely
describe("The Home Page Component", () => {
  // Each test for the component will get an `it` block
  it("should have exactly 1 `main` section", () => {
    // The getByRole will error if there are less or more than 1 element found
    expect(wrapper.find("main").type()).toBe("main");
  });

  it("should have an search input", () => {
    expect(wrapper.find("input[type='search']").type()).toBe("input");
  });

  it("the search field should have a placholder with text", () => {
    const searchField = wrapper.find("input");
    expect(searchField.props().placeholder).toBe(
      "Search and filter products..."
    );
  });
});
