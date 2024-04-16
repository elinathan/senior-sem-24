import NextPrevProject from "@/components/NextPrevProject";
import StudentInfo from "@/components/StudentInfo";
import probe from "probe-image-size";
import {
  fetchPageBlocks,
  fetchPageBySlug,
  fetchPages,
  fetchPageInfoFromSlug,
  fetchImageBlocks,
  notion,
} from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import { studentNames } from "@/components/StudentNames";
import Gallery from "@/components/Gallery";

export async function generateStaticParams() {
  const posts = await fetchPages().then((res) => res.results);

  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

export default async function Page({ params }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const pageInfo = await fetchPageInfoFromSlug(params.slug);
  console.log(pageInfo);

  const blocks = await fetchPageBlocks(post.id);
  // console.log(blocks);

  const images = await fetchImageBlocks(post.id);
  const imagesWithSizes = await Promise.all(
    images.map(async (image) => {
      if (!image.file?.url) return null;
      try {
        const size = await probe(image.file.url);
        return {
          ...image,
          width: size.width,
          height: size.height,
        };
      } catch (error) {
        console.error("Error fetching image size:", error);
        return null;
      }
    }),
  );

  const imagesForGallery = imagesWithSizes
    .filter((image) => image !== null)
    .map((image) => ({
      src: image.file.url || "",
      width: image.width,
      height: image.height,
      alt: `${params.slug} project image`,
    }));

  console.log(imagesForGallery);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const html = await renderer.render(...blocks);

  const studentNamesArray = studentNames.names;
  const currentIndex = studentNamesArray.findIndex(
    (name) => name.toLowerCase().replace(" ", "-") === params.slug,
  );

  // handle edge cases of beginning and end
  const nextIndex = (currentIndex + 1) % studentNamesArray.length;
  const prevIndex =
    (currentIndex - 1 + studentNamesArray.length) % studentNamesArray.length;

  const currentStudent = studentNamesArray[currentIndex];
  const nextStudent = studentNamesArray[nextIndex];
  const prevStudent = studentNamesArray[prevIndex];

  return (
    <>
      {/* <StudentInfo /> */}
      <main className="mx-auto my-12 mb-32 ">
        <NextPrevProject
          nextSlug={nextStudent.toLowerCase().replace(" ", "-")}
          nextTitle={nextStudent}
          prevSlug={prevStudent.toLowerCase().replace(" ", "-")}
          prevTitle={prevStudent}
        />
        <h1 className="text-3xl md:text-5xl">{currentStudent}</h1>
        <Gallery
          className="flex w-full flex-col gap-8 md:flex-row md:justify-center"
          images={imagesForGallery}
          equalHeight
          galleryID={`${params.slug}-gallery`}
        />
        <div
          className="mx-auto flex max-w-2xl flex-col gap-2 has-[p]:pb-0"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </main>
    </>
  );
}
