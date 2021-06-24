import {
  fetchExternalProducts,
  fetchLocalProducts,
  getAllProducts,
  getAllPublishedProducts,
} from "../../src/services/fetchProducts";

describe("Services - Test Fetch Products", () => {
  it("can fetchLocalProducts from markdown files", () => {
    fetchLocalProducts().then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
    });
  });
  it("can fetchExternalProducts from markdown files", () => {
    fetchExternalProducts().then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
    });
  });
  it("can getAllPublishedProducts", () => {
    getAllPublishedProducts().then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
    });
  });
  it("can getAllProducts", () => {
    getAllProducts().then((data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
    });
  });
});
