"use client";

import WordSearch from "@/components/WordSearch";
import StudentNames from "@/components/StudentNames";

export default function Home() {
  return (
    <main className="mb-20 mt-12 flex w-full flex-col gap-8">
      <div className="flex w-full flex-col">
        <h1 className="ml-3 text-2xl md:ml-12 md:text-5xl">
          WHERE WERE WE’RE WEAR
        </h1>
        <h2 className="ml-3 text-xl md:ml-12 md:text-2xl">
          University of Pennsylvania Design Senior Seminar 2024
        </h2>
      </div>
      <WordSearch />
      <StudentNames />
      <div className="mx-auto max-w-[528px]">
        <h3>The Show</h3>
        <p>
          WHERE, WEAR, WE’RE, WERE, the 2024 Senior Design Exhibition at the
          University of Pennsylvania, marks the culmination of our
          interdisciplinary studies as Design majors.
        </p>
        <p>
          We present works spanning from physical publications to digital
          landscapes. “Where” explores locations and cultures, “we’re” reflects
          on togetherness and social impact, “wear” examines materiality and the
          body, and “were” analyzes time and memory.
        </p>
      </div>
    </main>
  );
}
