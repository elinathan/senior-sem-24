import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Published",
      select: {
        equals: "Yes",
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

export const fetchPageBlocks = cache((pageId) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results);
});
