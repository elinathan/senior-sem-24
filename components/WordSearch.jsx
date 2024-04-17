"use client";

import { useMediaQuery } from "@/lib/use-media-query";

export default function WordSearch() {
  // const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  let wordSearchChars = Array.from(
    "D00W00 S00H00 G0WEAR N00R00 WERE00 000000 0SENRS 02O240".replace(
      /\s/g,
      "",
    ),
  );

  if (!isSmallScreen) {
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
  );
}
