/* eslint-disable import/no-extraneous-dependencies */
// Reference: https://nextjs.org/docs/api-reference/next.config.js/introduction

const nextBuildId = require("next-build-id");

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: async () => nextBuildId({ dir: __dirname, describe: true }),
  poweredByHeader: false,
  compress: true,
  env: {
    anotherEnv: "Can contain data..",
  },
  images: {
    domains: [
      "via.placeholder.com",
      "img.youtube.com",
      "i.imgur.com",
      "images.unsplash.com",
    ],
  },
};
