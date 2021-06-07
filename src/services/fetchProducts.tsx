import axios from "axios";
import fs from "fs";
import path, { join } from "path";
import { promisify } from "util";
import { getLocalProductsPath } from "../constants";
import { Product } from "../types";
import { convertProductFromContent } from "../utils/converter";
import isPublished from "../utils/isPublished";

export const fetchLocalProducts = async () => {
  const directory = join(process.cwd(), getLocalProductsPath());
  const filenames = fs.readdirSync(directory);

  const localProducts = filenames.map((filename) => {
    const fileFullPath = join(directory, filename);
    const fileToProcess = fs.lstatSync(fileFullPath);

    if (
      !fileToProcess.isDirectory() &&
      path.extname(fileFullPath).toLowerCase() === ".md"
    ) {
      const readFile = promisify(fs.readFile);
      return readFile(fileFullPath).then((fileContent) =>
        convertProductFromContent(fileContent.toString())
      );
    }
  });

  const productData: Product[] = [];
  const responses = await Promise.all(localProducts);
  const products = responses.filter(Boolean) as Product[];
  productData.push(...products);

  return productData.filter(Boolean);
};

export const fetchExternalProducts = async () => {
  const productData: Product[] = [];
  const contentUrl = process.env.EXTERNAL_CONTENTS
    ? process.env.EXTERNAL_CONTENTS
    : undefined;

  if (contentUrl) {
    const response = await axios.get(contentUrl);
    const promises = response.data.map((result: { download_url: string }) =>
      axios.get(result.download_url)
    );

    const responses = await Promise.all(promises);
    const products = responses.map((rawFile) => {
      const fileContent = rawFile as string;
      return convertProductFromContent(fileContent);
    });
    productData.push(...products);
  }

  return productData;
};

export const getAllPublishedProducts = async () => {
  const allProducts = (await getAllProducts()) as Product[];

  return allProducts.filter((p) => isPublished(p.published, p.unpublish));
};

export const getAllProducts = async () => {
  const loadExternalProducts =
    !!process.env.EXTERNAL_CONTENTS &&
    process.env.EXTERNAL_CONTENTS.toLowerCase() !== "false";

  const allProducts: Product[] = [];
  const localProducts = await fetchLocalProducts();

  if (loadExternalProducts) {
    const productData: Product[] = await fetchExternalProducts();
    allProducts.push(...productData);
  }

  allProducts.push(...localProducts);
  return allProducts;
};

export const getCustomSearchIndex = async () => {
  const arrIndexToReturn: string[] = [];
  const searchIndexFilename = "preCompiledSearchIndex.json";
  const directory = join(process.cwd(), "./public/");
  const filenames = fs
    .readdirSync(directory)
    .filter((f) => f.toString() === searchIndexFilename);

  const searchIndexContentPromise =
    filenames.length > 0
      ? filenames.map((filename) => {
          const fileFullPath = join(directory, filename);
          const readFile = promisify(fs.readFile);
          return readFile(fileFullPath).then((fileContent) =>
            fileContent.toString()
          );
        })
      : "";
  if (searchIndexContentPromise !== "") {
    const responses = await Promise.all(searchIndexContentPromise);
    const content = responses.filter(Boolean) as string[];
    arrIndexToReturn.push(...content);
  } else {
    return null;
  }
  return arrIndexToReturn.filter(Boolean)[0];
};
