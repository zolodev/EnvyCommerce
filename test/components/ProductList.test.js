import { shallow } from "enzyme";
import ProductList from "../../src/components/ProductList";
import { convertProductFromContent } from "../../src/utils/converter";

describe("Component - AddToCartButton", () => {
  const filecontentWithMetadataString =
    '---\nid: 13\n# published: "2020-05-13"\nname: Nike Air Pegasus size 38\ndescription: A plain modern shoe.\nprice: 289\n---\n\n## Nike Air Pegasus\n\nThe content of the pegasus can be written here...\n\n![nike shoe](https://i.imgur.com/hBsNuWe.jpg)\n';

  const products = [convertProductFromContent(filecontentWithMetadataString)];
  const wrapper = shallow(<ProductList data={products} />);

  it("can render a product", () => {
    expect(wrapper.html()).toBeTruthy();
  });
  it("can render a product link with slug", () => {
    expect(wrapper.find("Link").props().href).toContain(products[0].slug);
  });
  it("can render a product with a product price", () => {
    expect(wrapper.find("footer p").text()).toContain(products[0].price);
  });
  it("can render a product with a AddToCartButton", () => {
    expect(wrapper.find("AddToCartButton").html()).toBeTruthy();
  });
});
