/**
 * Image links expire in Notion, ugh, so these functions save the images locally at
 * build time and return the local path to the image.
 */

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export async function downloadImage(url, outputPath) {
  try {
    const urlToParse = new URL(url);
    const filename = path.basename(urlToParse.pathname);
    ensureDirectoryExistence(`${outputPath}/${filename}`);

    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    // Pipe the image data to a file
    const writer = fs.createWriteStream(`${outputPath}/${filename}`);
    response.body.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  try {
    const stat = fs.statSync(dirname);
    if (!stat.isDirectory()) {
      console.error(`The path ${dirname} exists but is not a directory.`);
      throw new Error(`The path ${dirname} exists but is not a directory.`);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      fs.mkdirSync(dirname, { recursive: true });
      console.log(`Directory ${dirname} created.`);
    } else {
      throw error; // Rethrow unexpected errors
    }
  }
}
