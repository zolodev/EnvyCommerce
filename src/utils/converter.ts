import matter from "gray-matter";
import slugify from "slugify";
import { Page, Product } from "../types";
import getImageData from "./imageInfo";

const localFormat = process.env.NEXT_PUBLIC_LOCALES ?? "en-US";
const currencyFormat = process.env.NEXT_PUBLIC_CURRENCY ?? "USD";

export const convertPrice = (price: number) => new Intl.NumberFormat(localFormat, {
  style: "currency",
  currency: currencyFormat,
}).format(price);

type ConvertOptions = {
  stringDateToConvert: string;
  includeTime?: boolean;
};
export const convertLocalDateTime = (_options: ConvertOptions) => {
  if (
    !_options
    || _options.stringDateToConvert === undefined
    || _options.stringDateToConvert === ""
  ) {
    throw new Error("Invalid Date");
  }
  const _convertedDate = new Date(_options.stringDateToConvert);

  const DateTimeOptions: any = _options.includeTime
    ? {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    : {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

  return new Intl.DateTimeFormat(localFormat, DateTimeOptions).format(
    _convertedDate,
  );
};

export const convertProductFromContent = (fileContent: string): Product => {
  const { data, content } = matter(fileContent);
  const slug = slugify(data.name, { lower: true });
  const url = `/product/${slug}`;
  const image = getImageData(data.image, `Product image for ${data.name}`);
  return {
    ...data, slug, url, image, content,
  } as Product;
};

export const convertPageFromContent = (
  fileContent: string,
  filename: string,
): Page => {
  const { data, content } = matter(fileContent);
  let pageToReturn = {} as Page;

  if (Object.entries(data).length !== 0) {
    const image = getImageData(
      data.image,
      `Hero image for page ${data.name}`,
      "https://via.placeholder.com/3440x290?text=No%20Image",
    );
    const slug = slugify(data.name, { lower: true, strict: true });
    const url = slug;
    pageToReturn = {
      ...data, slug, url, image, content,
    } as Page;
  } else {
    pageToReturn = {
      slug: slugify(filename, { lower: true }),
      image: getImageData(),
      content,
    } as Page;
  }

  return pageToReturn;
};

export const convertYouTubeUrlToID = (url: string): string => {
  // Original Gist: https://gist.github.com/takien/4077195
  const parsedUrl = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  return parsedUrl[2] ? parsedUrl[2].split(/[^0-9a-z_\-]/i)[0] : url;
};
