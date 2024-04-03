import Image from "next/image";
import Cursor from "@/components/Cursor";
import WordSearch from "@/components/WordSearch";
import StudentNames from "@/components/StudentNames";

export default function Home() {
  return (
    <main className="mx-auto mt-12 flex max-w-3xl flex-col gap-8">
      <Cursor />
      <h1 className="text-center text-3xl md:text-5xl">
        Where Were We’re Wear
      </h1>
      <h2 className="text-center text-xl md:text-2xl">
        University of Pennsylvania Design Senior Seminar Show
      </h2>
      <WordSearch fullText="KPWDEXFLETGNQUACSHVFKCLWROJYKRJUERZFAJANICEIAEHRXJULIANAKYRCLVEMKAILAHYLUIHIRSIWEARXHFRNSEBAHLALICEOTQEXLQYAAUQTNAPYHDKHIAANYBHAVKLCXQKRANBOTEMIREUHWAYNIEGAIDMIRBEESEDCCARWPARISDRYLROKBAKEJOELEEJOEUYEHBSRMDRPLOMWSARAHQOEMXZVF" />
      <StudentNames />
    </main>
  );
}
