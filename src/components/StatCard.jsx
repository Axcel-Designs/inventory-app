import { FiArrowUpRight } from "react-icons/fi";

export default function StatCard({ label, value, detail, icon: Icon, progress, accent = "text-[#78706a]" }) {
  return (
    <article className="flex min-h-36 flex-col justify-between rounded-xl bg-[#f6f0e8] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#605850]">{label}</p>
        {Icon && <Icon className={`h-5 w-5 ${accent}`} />}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <p className="text-3xl font-semibold tracking-tight text-[#3a302a]">{value}</p>
        {detail && <span className="inline-flex items-center text-xs text-[#8c3c3c]"><FiArrowUpRight />{detail}</span>}
      </div>
      {typeof progress === "number" && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ece6dc]">
          <div className="h-full rounded-full bg-[#78706a]" style={{ width: `${progress}%` }} />
        </div>
      )}
    </article>
  );
}
