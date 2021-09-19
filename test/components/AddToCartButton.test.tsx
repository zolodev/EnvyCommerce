import { render, screen } from "@testing-library/react";
import slugify from "slugify";
import AddToCartButton from "../../src/components/AddToCartButton";
import { Product } from "../../src/types";
import getImageData from "../../src/utils/imageInfo";

describe("Component - AddToCartButton", () => {
  const p1: Product = {
    id: "100",
    published: Date.now().toString(),
    unpublish: "",
    name: "Test Product",
    description: "A short description",
    hero: getImageData(),
    price: 200,
    slug: slugify("Test Product"),
    url: `/product/${slugify("Test Product")}`,
    content: "Hello!",
  };

  it("can render a button", () => {
    render(<AddToCartButton product={p1} />);

    expect(
      screen.getByText("Add to cart", {
        exact: true,
        selector: "button",
      })
    ).toBeTruthy();
  });
});
