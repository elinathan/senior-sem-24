"use client";

import Image from "next/image";
import Cursor from "@/components/Cursor";
import WordSearch from "@/components/WordSearch";
import StudentNames from "@/components/StudentNames";
import { useMediaQuery } from "@/lib/use-media-query";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="mt-12 flex w-full flex-col gap-8">
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
    </main>
  );
}
