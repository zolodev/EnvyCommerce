import { shallow } from "enzyme";
import HeroImage from "../../src/components/HeroImage";
import getImageData from "../../src/utils/imageInfo";

describe("Component - HeroImage", () => {
  const defaultImageInfo = getImageData();
  const wrapper = shallow(<HeroImage image={defaultImageInfo} />);

  it("can render default hero image", () => {
    expect(wrapper.find("div").html()).toContain("hero-imagesdefault");
  });
  it("has aria-label with alt text", () => {
    expect(wrapper.find("div").html()).toContain(
      'aria-label="' + defaultImageInfo.alt + '"'
    );
  });
  it("has a role img", () => {
    expect(wrapper.find("div").html()).toContain('role="img"');
  });
  it("has a tab index -1", () => {
    expect(wrapper.find("div").html()).toContain('tabindex="-1"');
  });
});
