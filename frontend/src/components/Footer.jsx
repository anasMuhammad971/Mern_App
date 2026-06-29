import { studentInfo } from "../config/studentInfo";

function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-semibold text-ink">{studentInfo.project}</p>
        <p>
          {studentInfo.name} | Matriculation: {studentInfo.matriculation} | {studentInfo.course}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
