import Link from "next/link";

export default function StudentInfo({ student }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col justify-between md:flex-row">
      <div className=" flex flex-col gap-2 md:w-1/2">
        <p className="p-0">{student.category}</p>
        <p className="p-0">{student.medium}</p>
        <p className="p-0">{student.themes}</p>
      </div>
      <div className="flex flex-col gap-2 md:w-1/3 md:text-right">
        <p className="p-0">{student.socialMediaHandles}</p>

        <Link
          href={`https://${student.portfolioSite}`}
          target="_blank"
          className="p-0"
        >
          {student.portfolioSite}
        </Link>
        <Link
          href={`https://${student.linkedin}`}
          className="p-0"
          target="_blank"
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
}
