import { shallow } from "enzyme";
import AddToCartButton from "../../src/components/AddToCartButton";

describe("Component - AddToCartButton", () => {
  const wrapper = shallow(<AddToCartButton />);

  it("can render a button", () => {
    expect(wrapper.find("button")).toBeTruthy();
  });
  it("has button text", () => {
    const button = wrapper.find("button");
    expect(button.text()).toBe("Add to cart");
  });
});
