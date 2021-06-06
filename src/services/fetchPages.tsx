import axios from "axios";
import fs from "fs";
import path, { join } from "path";
import { promisify } from "util";
import { Page } from "../types";
import { convertPageFromContent } from "../utils/converter";
import isPublished from "../utils/isPublished";

const fetchLocalPages = async () => {
  const localContentPath = process.env.LOCAL_PAGES_CONTENTS ?? "/Pages";
  const directory = join(process.cwd(), localContentPath);
  const filenames = fs.readdirSync(directory);

  const localPages = filenames.map((filename) => {
    const fileFullPath = join(directory, filename);
    const fileToProcess = fs.lstatSync(fileFullPath);

    if (
      !fileToProcess.isDirectory() &&
      path.extname(fileFullPath).toLowerCase() === ".md"
    ) {
      const readFile = promisify(fs.readFile);
      return readFile(fileFullPath).then((fileContent) =>
        convertPageFromContent(
          fileContent.toString(),
          filename.replace(path.extname(fileFullPath), "")
        )
      );
    }
  });

  const pageData: Page[] = [];
  const responses = await Promise.all(localPages);
  const pages = responses.filter(Boolean) as Page[];
  pageData.push(...pages);

  return pageData.filter(Boolean);
};

const fetchExternalPages = async () => {
  const pageData: Page[] = [];
  const contentUrl = process.env.EXTERNAL_CONTENTS
    ? process.env.EXTERNAL_CONTENTS
    : undefined;

  if (contentUrl) {
    const response = await axios.get(contentUrl);
    const promises = response.data.map((result: { download_url: string }) =>
      axios.get(result.download_url)
    );

    const responses = await Promise.all(promises);
    const pages = responses.map((rawFile, index) => {
      const fileContent = rawFile as string;
      return convertPageFromContent(fileContent, index.toString());
    });
    pageData.push(...pages);
  }

  return pageData;
};

export const getAllPublishedPages = async () => {
  const allPages = (await getAllPages()) as Page[];
  return allPages.filter((p) => isPublished(p.published, p.unpublish));
};

export const getAllPages = async () => {
  const loadExternalPages =
    !!process.env.EXTERNAL_CONTENTS &&
    process.env.EXTERNAL_CONTENTS.toLowerCase() !== "false";

  const allPages: Page[] = [];
  const localPages = await fetchLocalPages();

  if (loadExternalPages) {
    const pageData: Page[] = await fetchExternalPages();
    allPages.push(...pageData);
  }

  allPages.push(...localPages);
  return allPages;
};
