// Creds to Lee Robinson (leerob)
// website: https://leerob.io/
// github: https://github.com/leerob
// Reference:
// https://raw.githubusercontent.com/leerob/leerob.io/main/scripts/generate-sitemap.js

const fs = require("fs");

const globby = require("globby");
const prettier = require("prettier");

const dotenv = require("dotenv");

dotenv.config();

(async () => {
  const baseUrl = process.env.BASE_URL ?? "http://localhost";
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "src/pages/**/*.tsx",
    "Pages/**/*.md",
    "products/*.md",
    "!src/pages/_*.tsx",
    "!src/pages/**/[*.tsx",
    "!src/pages/api",
    "!src/pages/404.js",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("src/pages", "")
                  .replace("Pages", "")
                  .replace("Products", "products")
                  .replace(".tsx", "")
                  .replace(".md", "");
                const route = path === "/index" ? "" : path;

                return `
                        <url>
                            <loc>${baseUrl}${route}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
})();
