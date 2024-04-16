"use client";

import Image from "next/image";
import Cursor from "@/components/Cursor";
import WordSearch from "@/components/WordSearch";
import StudentNames from "@/components/StudentNames";
import { useMediaQuery } from "@/lib/use-media-query";

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  let wordSearchChars;
  if (isSmallScreen) {
    wordSearchChars = Array.from(
      "DFIWRASNEHTSGIWEARNHBRHAWERELQEMTBNDRSENRSE2024P",
    );
  } else {
    wordSearchChars = Array.from(
      "D0000000 S0000W0W G0000H0E N000WEAR 00000R0E 00WERE00".replace(
        /\s/g,
        "",
      ),
    );
  }

  // function to choose a random letter of the alphabet in caps
  function randomLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  return (
    <main className="mt-12 flex w-full flex-col gap-8">
      <div className="flex w-full flex-col">
        <h1 className="ml-12 text-3xl md:text-5xl">Where Were We’re Wear</h1>
        <h2 className="ml-12 text-xl md:text-2xl">
          University of Pennsylvania Design Senior Seminar 2024
        </h2>
      </div>
      <div className="grid grid-cols-6 gap-y-4 md:grid-cols-8 md:gap-y-8">
        {wordSearchChars.map((letter, index) => {
          let wordSearchLetter;
          if (letter === "0") wordSearchLetter = randomLetter();
          else wordSearchLetter = letter;
          return (
            <span
              suppressHydrationWarning // because of random choice of letter
              className={`${letter != "0" ? "text-red-600" : "text-black"} flex justify-center text-center text-5xl font-semibold leading-none md:text-7xl`}
              key={index}
            >
              {wordSearchLetter}
            </span>
          );
        })}
      </div>
      <StudentNames />
    </main>
  );
}

{
  /* <WordSearch fullText="KPWDEXFLETGNQUACSHVFKCLWROJYKRJUERZFAJANICEIAEHRXJULIANAKYRCLVEMKAILAHYLUIHIRSIWEARXHFRNSEBAHLALICEOTQEXLQYAAUQTNAPYHDKHIAANYBHAVKLCXQKRANBOTEMIREUHWAYNIEGAIDMIRBEESEDCCARWPARISDRYLROKBAKEJOELEEJOEUYEHBSRMDRPLOMWSARAHQOEMXZVF" />; */
}
