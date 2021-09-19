import { render, screen } from "@testing-library/react";
import React from "react";
import HeroImage from "../../src/components/HeroImage";
import getImageData from "../../src/utils/imageInfo";

describe("Component - HeroImage", () => {
  const defaultImageInfo = getImageData();

  beforeAll(() => {
    render(<HeroImage image={defaultImageInfo} />);
  });

  it("can render default hero image", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "No image description available for /images/DefaultNoImage.webp",
        {
          exact: true,
          selector: "div",
        }
      )
    ).toBeInTheDocument();
  });
});
