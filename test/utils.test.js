import {
  convertLocalDateTime,
  convertPrice,
  convertYouTubeUrlToID,
} from "../src/utils/converter";
describe("Test the utils", () => {
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
        convertYouTubeUrlToID("http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg")
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
});
