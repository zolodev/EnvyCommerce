import { shallow } from "enzyme";
import Home, { getStaticProps } from "../../src/pages/index";

const wrapper = shallow(<Home />);

// `describe` is not required, but it helps the tests read nicely
describe("Page - Test The Home Page Component", () => {
  // Each test for the component will get an `it` block

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      NEXT_PUBLIC_FILTER_KEYS: "name, description",
    });
  });
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
  it("can get static props, allProducts", async () => {
    const props = await getStaticProps().then((data) => {
      expect(data).toBeDefined();
      expect(data.props.allProducts).toBeDefined();
    });
    expect(props).toBeFalsy();
  });
  it("can get static props, filtered keys from .env varible", () => {
    const expected = {
      props: { filterKeys: ["name", "description"] },
    };
    getStaticProps().then((data) => {
      expect(data.props.filterKeys).toBeDefined();
      expect(data.props.filterKeys).toMatchObject(expected.props.filterKeys);
    });
  });
});
