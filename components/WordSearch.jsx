"use client";

export default function WordSearch({ fullText }) {
  const characters = Array.from(fullText);
  return (
    <div className="grid-cols-15 mx-auto grid w-max gap-2 md:gap-3">
      {characters.map((letter, index) => {
        return (
          <span
            className=" size-[14px] text-center text-lg font-semibold leading-none md:size-6 md:text-xl"
            key={index}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
