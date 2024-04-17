import Link from "next/link";

export const studentNames = {
  names: [
    "Ishaani Basu",
    "Andrew Chae",
    "Rayah Iqbal",
    "Yune Kim",
    "Iris Lee",
    "Eli Nathan",
    "Tarah Paul",
    "Rachel Shapiro",
    "Gabe Garcia",
    "Mila Carty",
    "Alice Choi",
    "Janice Kim",
    "Tyler Kliem",
    "Elom Vedomey",
    "Rebekah Lee",
    "Paris Rosen",
    "Sarah Tretler",
    "Juliana Yu",
  ],
};

export default function StudentNames() {
  return (
    <div className="mx-auto grid grid-flow-col grid-rows-6 gap-x-6 md:w-[528px] md:grid-rows-5 md:gap-x-4 md:text-lg">
      {studentNames.names.map((name, index) => (
        <Link
          className=" no-underline"
          key={index}
          href={`/${name.toLowerCase().replace(" ", "-")}`}
        >
          <div className="cursor-pointer">{name}</div>
        </Link>
      ))}
    </div>
  );
}
