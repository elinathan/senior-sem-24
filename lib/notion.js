import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";
import probe from "probe-image-size";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  });
});

export const fetchPageBySlug = cache((slug) => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0]);
});

export const fetchPageInfoFromSlug = cache((slug) => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => {
      const page = res.results[0];
      if (!page) {
        return null;
      }

      const medium =
        page.properties["Medium"]?.[page.properties["Medium"].type]?.[0]
          ?.plain_text;
      const category =
        page.properties["Category"]?.[page.properties["Category"].type]?.[0]
          ?.plain_text;
      const themes =
        page.properties["Themes"]?.[page.properties["Themes"].type]?.[0]
          ?.plain_text || "";
      const socialMediaHandles =
        page.properties["Social Media Handles"]?.[
          page.properties["Social Media Handles"].type
        ]?.[0]?.plain_text || "";
      const portfolioSite =
        page.properties["Portfolio Site"]?.[
          page.properties["Portfolio Site"].type
        ]?.[0]?.plain_text || "";
      const linkedin =
        page.properties["LinkedIn"]?.[page.properties["LinkedIn"].type]?.[0]
          ?.plain_text || "";

      return {
        id: page.id,
        medium: medium,
        category: category,
        themes: themes,
        socialMediaHandles: socialMediaHandles,
        portfolioSite: portfolioSite,
        linkedin: linkedin,
      };
    });
});

export const fetchImageBlocks = cache((pageId) => {
  return notion.blocks.children.list({ block_id: pageId }).then(async (res) => {
    const images = res.results.filter((block) => block.type === "image");
    const imagesWithSizes = await Promise.all(
      images.map(async (block) => {
        if (!block.image.file?.url) return null;
        try {
          const size = await probe(block.image.file.url);
          return {
            src: block.image.file.url,
            width: size.width,
            height: size.height,
            alt: block.image.file.caption?.[0]?.plain_text || "Project file",
          };
        } catch (error) {
          console.error("Error fetching image size:", error);
          return null;
        }
      }),
    );
    return imagesWithSizes.filter((image) => image !== null);
  });
});

// excludes images for custom image handling
export const fetchPageBlocks = cache((pageId) => {
  return notion.blocks.children.list({ block_id: pageId }).then((res) => {
    return res.results.filter((block) => block.type !== "image");
  });
});
