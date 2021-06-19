const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const matter = require("gray-matter");
const slugify = require("slugify");
const createProductIndex = require("./PreCreateIndexedForSearch.js");

const isPublished = (publishDate, unpublishDate) => {
  const DateNow = new Date().getTime();

  const isPublished =
    !!publishDate && new Date(publishDate.toString()).getTime() <= DateNow;

  const isNotUnpublished =
    !unpublishDate || DateNow <= new Date(unpublishDate.toString()).getTime();

  return isPublished && isNotUnpublished;
};

const fetchLocalProducts = async () => {
  const directory = path.join(
    process.cwd(),
    process.env.LOCAL_CONTENTS ?? "/Products"
  );
  const filenames = fs.readdirSync(directory);

  const localProducts = filenames.map((filename) => {
    const fileFullPath = path.join(directory, filename);
    const fileToProcess = fs.lstatSync(fileFullPath);

    if (
      !fileToProcess.isDirectory() &&
      path.extname(fileFullPath).toLowerCase() === ".md"
    ) {
      const readFile = promisify(fs.readFile);
      return readFile(fileFullPath).then((fileContent) => {
        const { data } = matter(fileContent.toString());
        const slug = slugify(data.name, { lower: true });
        const url = "/product/" + slug;

        return { ...data, slug, url };
      });
    }
  });

  const productData = [];
  const responses = await Promise.all(localProducts);
  const products = responses.filter(Boolean);
  productData.push(...products);

  return productData
    .filter(Boolean)
    .filter((p) => isPublished(p.published, p.unpublish));
};

fetchLocalProducts().then((products) => {
  const productsFilePath = path.join(
    process.cwd(),
    process.env.LOCAL_CONTENTS ?? "./public/products.json"
  );
  const productsSearchIndexFilePath = path.join(
    process.cwd(),
    process.env.LOCAL_CONTENTS ?? "./public/preCompiledSearchIndex.json"
  );

  fs.writeFileSync(productsFilePath, JSON.stringify(products));

  const searchIndex = createProductIndex(productsSearchIndexFilePath, products);
  fs.writeFileSync(productsSearchIndexFilePath, searchIndex);
});
