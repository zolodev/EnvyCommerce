const dotenv = require("dotenv");
const Fuse = require("fuse.js");

dotenv.config();

const createProductIndex = function (
  _indexFilePath,
  _products,
  _keys = undefined
) {
  const keys = process.env.NEXT_PUBLIC_FILTER_KEYS
    ? process.env.NEXT_PUBLIC_FILTER_KEYS?.toString()
        .replace(/\s+/g, "")
        .split(",")
    : ["name"];
  const filterByKeys = _keys ?? keys;
  const productsIndex = Fuse.createIndex(filterByKeys, _products);
  return JSON.stringify(productsIndex.toJSON());
};

module.exports = createProductIndex;
