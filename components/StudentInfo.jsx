export default function StudentInfo({ student }) {
  return (
    <div className="mx-auto flex max-w-2xl justify-between">
      <div className="flex flex-col gap-2">
        <p className="p-0">{student.category}</p>
        <p className="p-0">{student.medium}</p>
        <p className="p-0">{student.themes}</p>
      </div>
      <div>
        <p className="">{student.socialMediaHandles}</p>
        <p className="">{student.portfolioSite}</p>
        <p className="">{student.linkedin}</p>
      </div>
    </div>
  );
}
