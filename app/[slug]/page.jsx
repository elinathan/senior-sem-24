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
import { downloadImage } from "@/lib/image-handling";

export async function generateStaticParams() {
  const posts = await fetchPages().then((res) => res.results);

  return posts.map((post) => ({
    slug: post.properties.Slug.rich_text[0].plain_text,
  }));
}

export async function generateMetadata({ params }) {
  const studentNamesArray = studentNames.names;
  const currentIndex = studentNamesArray.findIndex(
    (name) => name.toLowerCase().replace(" ", "-") === params.slug,
  );
  const currentStudent = studentNamesArray[currentIndex];

  return {
    title: currentStudent,
    description: "University of Pennsylvania Design Senior Seminar 2024",
  };
}

export default async function Page({ params }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const pageInfo = await fetchPageInfoFromSlug(params.slug);
  // console.log(pageInfo);

  const blocks = await fetchPageBlocks(post.id);
  // console.log(blocks);

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

  let imagesForGallery = await fetchImageBlocks(post.id);

  for (const image of imagesForGallery) {
    if (image === null) continue;
    console.log("hello");
    await downloadImage(
      image.src,
      `public/project_images/${currentStudent.replace(" ", "-").toLowerCase()}`,
    );
    image.src = `project_images/${currentStudent.replace(" ", "-").toLowerCase()}/${image.src.split("/").pop().split("?")[0]}`;
    console.log(image.src);
  }

  const images = imagesForGallery;

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const [firstBlock, ...restBlocks] = blocks;
  const titleBlock = await renderer.render(firstBlock);
  const restBlocksHtml = await await renderer.render(...restBlocks);

  return (
    <>
      <main className="mx-auto my-20 mb-32 ">
        <NextPrevProject
          nextSlug={nextStudent.toLowerCase().replace(" ", "-")}
          nextTitle={nextStudent}
          prevSlug={prevStudent.toLowerCase().replace(" ", "-")}
          prevTitle={prevStudent}
        />
        <h1 className="mx-auto max-w-2xl text-3xl md:text-5xl">
          {currentStudent}
        </h1>
        <Gallery
          className="mb-4 flex w-full flex-col gap-8 md:flex-row md:justify-center"
          images={images}
          equalHeight
          galleryID={`${params.slug}-gallery`}
        />
        <div
          className="mx-auto flex max-w-2xl flex-col gap-2 text-2xl"
          dangerouslySetInnerHTML={{ __html: titleBlock }}
        ></div>
        <StudentInfo student={pageInfo} />
        <div
          className="mx-auto flex max-w-2xl flex-col gap-2 has-[p]:pb-0"
          dangerouslySetInnerHTML={{ __html: restBlocksHtml }}
        ></div>
      </main>
    </>
  );
}
