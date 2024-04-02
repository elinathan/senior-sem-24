import Image from "next/image";
import Cursor from "@/components/Cursor";
import WordSearch from "@/components/WordSearch";

export default function Home() {
  return (
    <main className="mx-auto mt-12 flex max-w-2xl flex-col gap-8">
      <Cursor />
      <WordSearch fullText="KPWDEXFLETGNQUACSHVFKCLWROJYKRJUERZFAJANICEIAEHRXJULIANAKYRCLVEMKAILAHYLUIHIRSIWEARXHFRNSEBAHLALICEOTQEXLQYAAUQTNAPYHDKHIAANYBHAVKLCXQKRANBOTEMIREUHWAYNIEGAIDMIRBEESEDCCARWPARISDRYLROKBAKEJOELEEJOEUYEHBSRMDRPLOMWSARAHQOEMXZVF" />
      {/* <h1>Hello World</h1>
      <p>Lorem ipsum dolor sit amet</p> */}
    </main>
  );
}
