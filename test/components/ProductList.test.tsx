import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import {
  convertPrice,
  convertProductFromContent,
} from "../../src/utils/converter";

describe("Component - AddToCartButton", () => {
  const filecontentWithMetadataString =
    '---\nid: 13\n# published: "2020-05-13"\nname: Nike Air Pegasus size 38\ndescription: A plain modern shoe.\nprice: 289\n---\n\n## Nike Air Pegasus\n\nThe content of the pegasus can be written here...\n\n![nike shoe](https://i.imgur.com/hBsNuWe.jpg)\n';

  const products = [convertProductFromContent(filecontentWithMetadataString)];

  beforeEach(() => {
    render(<ProductList data={products} />);
  });

  it("can render a product", () => {
    expect(
      screen.getByText("Add to cart", { exact: true, selector: "button" })
    ).toBeTruthy();
  });

  it("can render a product link with correct url", () => {
    expect(screen.getByRole("link")).toHaveAttribute("href", products[0].url);
  });

  it("can render a product with a product price", () => {
    const expectedPrice = convertPrice(products[0].price);

    expect(screen.getByText(expectedPrice)).toHaveTextContent(
      products[0].price.toString()
    );
  });

  it("can render a product with a AddToCartButton", () => {
    expect(screen.getByRole("button")).toHaveTextContent("Add to cart");
  });
});
