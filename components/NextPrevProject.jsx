"use client";

import Link from "next/link";

export default function NextPrevProject({
  nextSlug,
  nextTitle,
  prevSlug,
  prevTitle,
}) {
  console.log(nextSlug, nextTitle, prevSlug, prevTitle);
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="flex justify-between p-4">
        {prevSlug && (
          <Link className="no-underline" href={`/${prevSlug}`}>
            <div>
              <h3 className="p-0 no-underline">{prevTitle}</h3>
              <p>Previous Project</p>
            </div>
          </Link>
        )}
        {nextSlug && (
          <Link className="no-underline" href={`/${nextSlug}`}>
            <div>
              <h3 className="p-0 no-underline">{nextTitle}</h3>
              <p>Next Project</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
