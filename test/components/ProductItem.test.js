import { shallow } from "enzyme";
import ProductItem from "../../src/components/ProductItem";
import { convertProductFromContent } from "../../src/utils/converter";

describe("Component - AddToCartButton", () => {
  const filecontentWithMetadataString =
    '---\nid: 13\n# published: "2020-05-13"\nname: Nike Air Pegasus size 38\ndescription: A plain modern shoe.\nprice: 289\n---\n\n## Nike Air Pegasus\n\nThe content of the pegasus can be written here...\n\n![nike shoe](https://i.imgur.com/hBsNuWe.jpg)\n';

  const product = convertProductFromContent(filecontentWithMetadataString);
  const wrapper = shallow(<ProductItem product={product} />);

  it("can render a product", () => {
    expect(wrapper.find(".Product-Card").html()).toBeTruthy();
  });
  it("can render a product h2 with a visible product name", () => {
    expect(wrapper.find("h2").text()).toBe(product.name);
  });
  it("can render a product p (paragraph) with a visible product description", () => {
    expect(wrapper.find("p").text()).toBe(product.description);
  });
});
