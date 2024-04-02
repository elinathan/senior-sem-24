"use client";

export default function WordSearch({ fullText }) {
  const characters = Array.from(fullText);
  return (
    <div className="mx-auto flex w-[600px] flex-row flex-wrap">
      {characters.map((letter, index) => {
        return (
          <span className="mx-2 my-2 size-6 text-center text-xl" key={index}>
            {letter}
          </span>
        );
      })}
    </div>
  );
}
