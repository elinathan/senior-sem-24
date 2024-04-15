import NextPrevProject from "@/components/NextPrevProject";
import StudentInfo from "@/components/StudentInfo";
import {
  fetchPageBlocks,
  fetchPageBySlug,
  fetchPages,
  notion,
} from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await fetchPages().then((res) => res.results);

  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

export default async function Page({ params }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);
  console.log(blocks);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const html = await renderer.render(...blocks);

  return (
    <>
      {/* <StudentInfo /> */}
      <main className="mx-auto my-12 mb-32 max-w-2xl">
        <NextPrevProject
          nextSlug="tales-of-the-himalayas"
          nextTitle="Rayah Iqbal"
          prevSlug="tales-of-the-himalayas"
          prevTitle="Rayah Iqbal"
        />
        <div
          className="mx-auto flex flex-col gap-2 has-[p]:pb-0"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </main>
    </>
  );
}
