"use client";

export default function WordSearch({ fullText }) {
  const characters = Array.from(fullText);
  return (
    <div className="mx-auto flex w-[570px] flex-row flex-wrap">
      {characters.map((letter, index) => {
        return (
          <span
            className="mx-1.5 my-1.5 size-6 text-center text-xl font-semibold"
            key={index}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}
