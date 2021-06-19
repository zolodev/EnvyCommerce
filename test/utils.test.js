import {
  getAddToCartButtonText,
  getAllFilterKeys,
  getCheckoutButtonText,
  getProcessPaymentButtonText,
} from "../src/constants";
import {
  convertImagesToImageInfoList,
  convertLocalDateTime,
  convertPageFromContent,
  convertPrice,
  convertProductFromContent,
  convertYouTubeUrlToID,
} from "../src/utils/converter";
import getImageData from "../src/utils/imageInfo";
import isPublished from "../src/utils/isPublished";

describe("Test the utils", () => {
  describe("Test converters", () => {
    describe("Test convert prices", () => {
      it("can convert price from a number from 20 to $20.00", () => {
        const convertedPrice = convertPrice(20);
        expect(convertedPrice).toBe("$20.00");
      });
      it("can convert price from a decimal number from 20.99 to $20.99", () => {
        const convertedPrice = convertPrice(20.99);
        expect(convertedPrice).toBe("$20.99");
      });
    });

    describe("Test convert date and time", () => {
      it("can convert local date from string to local Date", () => {
        const convertedDate = convertLocalDateTime({
          stringDateToConvert: "2021-05-01",
        });
        expect(convertedDate).toBe("5/1/2021");
      });
      it("can convert local date from string to local Date explicit without time", () => {
        const convertedDate = convertLocalDateTime({
          stringDateToConvert: "2021-05-01",
          includeTime: false,
        });
        expect(convertedDate).toBe("5/1/2021");
      });
      it("can convert local date from string to local Date", () => {
        const convertedDate = convertLocalDateTime({
          stringDateToConvert: "2021-05-01 12:05",
          includeTime: true,
        });
        expect(convertedDate).toBe("5/1/2021, 12:05 PM");
      });
      it("can not convert number to date", () => {
        const convertedDate = convertLocalDateTime({
          stringDateToConvert: 20210501,
        });
        expect(convertedDate).toBe("1/1/1970");
      });
      it("can throw error in case of date is undefined", () => {
        const convertedDate = () =>
          convertLocalDateTime({
            stringDateToConvert: undefined,
          });

        expect(convertedDate).toThrow("Invalid Date");
      });
      it("can throw error in case of date is empty", () => {
        const convertedDate = () =>
          convertLocalDateTime({
            stringDateToConvert: "",
          });

        expect(convertedDate).toThrow("Invalid Date");
      });
      it("can throw error in case convertLocalDateTime missing object", () => {
        expect(() => convertLocalDateTime()).toThrow("Invalid Date");
      });
    });

    describe("can extract YouTube ID from a any given URL string", () => {
      it("can extract ID from googleapis url", () => {
        expect(
          convertYouTubeUrlToID(
            "http://youtube.googleapis.com/v/4e_kz79tjb8?version=3"
          )
        ).toBe("4e_kz79tjb8");
      });
      it("can extract ID from feature url", () => {
        expect(
          convertYouTubeUrlToID(
            "https://www.youtube.com/watch?feature=g-vrec&v=Y1xs_xPb46M"
          )
        ).toBe("Y1xs_xPb46M");
      });
      it("can extract ID from embedded url", () => {
        expect(
          convertYouTubeUrlToID(
            "http://www.youtube.com/watch?feature=player_embedded&v=Ab25nviakcw#"
          )
        ).toBe("Ab25nviakcw");
      });
      it("can extract ID from shortened url", () => {
        expect(convertYouTubeUrlToID("http://youtu.be/Ab25nviakcw")).toBe(
          "Ab25nviakcw"
        );
      });
      it("can extract ID from normal watch url", () => {
        expect(
          convertYouTubeUrlToID("http://www.youtube.com/watch?v=Ab25nviakcw")
        ).toBe("Ab25nviakcw");
      });
      it("can extract ID from iframe embedded url", () => {
        expect(
          convertYouTubeUrlToID(
            '<iframe width="420" height="315" src="http://www.youtube.com/embed/Ab25nviakcw" frameborder="0" allowfullscreen></iframe>'
          )
        ).toBe("Ab25nviakcw");
      });
      it("can extract ID from object embedded url", () => {
        expect(
          convertYouTubeUrlToID(
            '<object width="420" height="315"><param name="movie" value="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>'
          )
        ).toBe("Ab25nviakcw");
      });
      it("can extract ID from image url", () => {
        expect(
          convertYouTubeUrlToID(
            "http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg"
          )
        ).toBe("Ab25nviakcw");
      });
      it("can extract ID from normal with feature url", () => {
        expect(
          convertYouTubeUrlToID(
            "https://www.youtube.com/watch?v=BGL22PTIOAM&feature=g-all-xit"
          )
        ).toBe("BGL22PTIOAM");
      });
      it("can extract ID from an ID", () => {
        expect(convertYouTubeUrlToID("BGL22PTIOAM")).toBe("BGL22PTIOAM");
      });
    });

    describe("can convert Product from markdown", () => {
      const filecontentWithMetadataString =
        '---\nid: 13\n# published: "2020-05-13"\nname: Nike Air Pegasus size 38\ndescription: A plain modern shoe.\nprice: 289\n---\n\n## Nike Air Pegasus\n\nThe content of the pegasus can be written here...\n\n![nike shoe](https://i.imgur.com/hBsNuWe.jpg)\n';

      const expectedProductWithMetadata = {
        id: 13,
        name: "Nike Air Pegasus size 38",
        description: "A plain modern shoe.",
        price: 289,
        slug: "nike-air-pegasus-size-38",
        url: "/product/nike-air-pegasus-size-38",
      };

      const expectedPageWithMetadata = {
        id: 13,
        name: "Nike Air Pegasus size 38",
        description: "A plain modern shoe.",
        price: 289,
        slug: "nike-air-pegasus-size-38",
        url: "nike-air-pegasus-size-38",
      };

      const expectedMinimumProductObject = {
        slug: "defaultslugfilename",
        content: "## This is a test string",
      };

      it("can convert file content to a Product", () => {
        const aProduct = convertProductFromContent(
          filecontentWithMetadataString
        );
        expect(aProduct).toMatchObject(expectedProductWithMetadata);
      });
      it("can convert to page from markdown content", () => {
        const aPage = convertPageFromContent(
          filecontentWithMetadataString,
          "defaultSlugFilename"
        );
        expect(aPage).toMatchObject(expectedPageWithMetadata);
      });
      it("can convert to page from markdown content no metadata", () => {
        const miniPage = convertPageFromContent(
          "## This is a test string",
          "defaultSlugFilename"
        );
        expect(miniPage).toMatchObject(expectedMinimumProductObject);
      });
      it("can convert a list images to a list of type ImageInfo", () => {
        const arrToConvert = ["/image/1.jpg", "/image/2.jpg"];
        const expectedObject = [
          {
            src: "/image/1.jpg",
            alt: "Product image for Test Name variant 1",
            isDefaultImage: false,
          },
          {
            src: "/image/2.jpg",
            alt: "Product image for Test Name variant 2",
            isDefaultImage: false,
          },
        ];

        const resultToValidate = convertImagesToImageInfoList(
          arrToConvert,
          "Test Name"
        );

        expect(resultToValidate).toHaveLength(2);
        expect(resultToValidate).toMatchObject(expectedObject);
      });
    });
  });

  describe("Test imageInfo", () => {
    it("can provide default data from getImageData", () => {
      const defaultImageDataProperties = {
        src: "/images/DefaultNoImage.webp",
        alt: "No image description available for /images/DefaultNoImage.webp",
        isDefaultImage: true,
      };
      expect(getImageData()).toMatchObject(defaultImageDataProperties);
    });
    it("can return by src", () => {
      const imageData = getImageData("/my/test/path/to/image.jpg");
      const expected = {
        src: "/my/test/path/to/image.jpg",
        alt: "No image description available for /my/test/path/to/image.jpg",
        isDefaultImage: false,
      };
      expect(imageData).toMatchObject(expected);
    });
  });

  describe("Test isPublished", () => {
    it("can determin if parameter is of type date, as true", () => {
      expect(isPublished(new Date("2020-02-01"))).toBeTruthy();
    });
    it("can determin if both parameters is of type date, as true", () => {
      expect(
        isPublished(new Date("2020-02-01"), new Date("9999-12-31"))
      ).toBeTruthy();
    });
    it("can determin if publish date is now, as true", () => {
      expect(isPublished("2020-01-01")).toBeTruthy();
    });
    it("can determin if publish date and has future unpublish date is now, as true", () => {
      expect(isPublished("2020-01-01", "9999-12-31")).toBeTruthy();
    });
    it("can determin if publish date has been (outdated or overdue), as false", () => {
      expect(isPublished("2020-01-01", "2020-02-01")).toBeFalsy();
    });
    it("can determin if reversed order, as false", () => {
      expect(isPublished("2020-02-01", "2020-01-01")).toBeFalsy();
    });
    it("can determin if no valid publish, as false", () => {
      expect(isPublished("No Valid Date")).toBeFalsy();
    });
    it("can determin if empty, as false", () => {
      expect(isPublished()).toBeFalsy();
    });
  });

  describe("Test constants", () => {
    it("can get all default Filter keys", () => {
      expect(getAllFilterKeys()).toMatchObject(["name"]);
    });
    it("can get Filter keys passed via .env variabel", () => {
      process.env = Object.assign(process.env, {
        NEXT_PUBLIC_FILTER_KEYS: "name, description",
      });

      expect(getAllFilterKeys()).toMatchObject(["name", "description"]);
    });
    it("can get AddToCartButton default text", () => {
      expect(getAddToCartButtonText()).toBe("Add to cart");
    });
    it("can get AddToCartButton by env variabel", () => {
      process.env = Object.assign(process.env, {
        NEXT_PUBLIC_PRODUCT_ADD_TO_CART_DISPLAY_TEXT: "Yet another Add to cart",
      });
      expect(getAddToCartButtonText()).toBe("Yet another Add to cart");
    });
    it("can get CheckoutButton default text", () => {
      expect(getCheckoutButtonText()).toBe("Checkout");
    });
    it("can get CheckoutButton by env variabel", () => {
      process.env = Object.assign(process.env, {
        NEXT_PUBLIC_PRODUCT_CHECKOUT_DISPLAY_TEXT: "Yet another Checkout",
      });
      expect(getCheckoutButtonText()).toBe("Yet another Checkout");
    });

    it("can get ProcessPaymentButton default text", () => {
      expect(getProcessPaymentButtonText()).toBe("Process Payment");
    });
    it("can get ProcessPaymentButton text by env variabel", () => {
      process.env = Object.assign(process.env, {
        NEXT_PUBLIC_PRODUCT_PROCESS_PAYMENT_DISPLAY_TEXT:
          "Yet another Process Payment",
      });
      expect(getProcessPaymentButtonText()).toBe("Yet another Process Payment");
    });
  });
});
