import { studentInfo } from "../config/studentInfo";

function StudentBadge({ compact = false }) {
  return (
    <div className="rounded-lg border border-line bg-white/95 px-4 py-3 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-normal text-campus">Prepared by</p>
      <p className="mt-1 text-sm font-bold text-ink">{studentInfo.name}</p>
      {!compact && (
        <p className="mt-1 text-xs font-semibold text-slate-500">
          Matriculation: {studentInfo.matriculation}
        </p>
      )}
    </div>
  );
}

export default StudentBadge;
