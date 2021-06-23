import { render, screen } from "@testing-library/react";
import ProductItem from "../../src/components/ProductItem";
import { convertProductFromContent } from "../../src/utils/converter";

describe("Component - AddToCartButton", () => {
  const filecontentWithMetadataString =
    '---\nid: 13\n# published: "2020-05-13"\nname: Nike Air Pegasus size 38\ndescription: A plain modern shoe.\nprice: 289\n---\n\n## Nike Air Pegasus\n\nThe content of the pegasus can be written here...\n\n![nike shoe](https://i.imgur.com/hBsNuWe.jpg)\n';

  const product = convertProductFromContent(filecontentWithMetadataString);

  beforeEach(() => {
    render(<ProductItem product={product} />);
  });

  it("can render a product h2 with a visible product name", () => {
    expect(
      screen.getByText(product.name, { exact: true, selector: "h2" })
    ).toBeTruthy();
  });

  it("can render a product p (paragraph) with a visible product description", () => {
    expect(
      screen.getByText(product.description, { exact: true, selector: "p" })
    ).toBeInTheDocument();
  });
});
