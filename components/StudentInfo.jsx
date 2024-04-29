export default function StudentInfo({ student }) {
  return (
    <div className="mx-auto mb-4 flex max-w-2xl flex-col justify-between md:flex-row md:gap-4">
      <div className=" flex flex-col gap-2 md:w-2/3">
        <p className="p-0">{student.category}</p>
        <p className="p-0">{student.medium}</p>
        {student.themes.length !== 0 && <p className="p-0">{student.themes}</p>}
      </div>
      <div className="flex flex-col gap-2 md:w-1/3 md:text-right">
        {student.socialMediaHandles.length !== 0 && (
          <p className="p-0">{student.socialMediaHandles}</p>
        )}
        {student.portfolioSite.length !== 0 && (
          <a href={`${student.portfolioSite}`} target="_blank" className="p-0">
            {student.portfolioSite}
          </a>
        )}
        {student.linkedin.length !== 0 && (
          <a href={`${student.linkedin}`} className="p-0" target="_blank">
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
