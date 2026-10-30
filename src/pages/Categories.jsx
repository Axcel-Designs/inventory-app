import { useMemo, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiArrowRight,
  FiBox,
  FiCloud,
  FiDownload,
  FiFilter,
  FiLayers,
  FiPlus,
  FiRefreshCw,
  FiSettings,
  FiSliders,
  FiX,
} from "react-icons/fi";
import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import Button from "../components/ui/Button";
import { categories, stats } from "../data/categories";


const iconMap = {
  hardware: FiSettings,
  electronics: FiActivity,
  packaging: FiBox,
  metals: FiLayers,
  office: FiGridFallback,
  chemical: FiCloud,
};
function FiGridFallback(props) {
  return <FiBox {...props} />;
}

function CategoryCard({ category, onSelect }) {
  const Icon = iconMap[category.icon] || FiBox;
  const hasAlerts = category.alertCount > 0;
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl bg-[#f6f0e8] p-4 shadow-sm transition hover:bg-[#f2ece4]">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ece6dc] text-[#78706a]">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[#3a302a] group-hover:text-[#78706a]">
                {category.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-[#605850]">
                TAXON-ID: {category.code}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelect(category)}
            title="Configure rules"
            className="rounded-lg p-2 text-[#605850] hover:bg-[#e6e0d6]"
          >
            <FiSettings />
          </button>
        </div>
        <div className="relative my-4 h-24 overflow-hidden rounded-lg">
          <img
            src={category.image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 font-mono text-[10px] text-[#3a302a]">
            {category.location}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-[#ece6dc] p-2">
            <p className="text-[10px] font-semibold uppercase text-[#605850]">
              SKU Count
            </p>
            <p className="mt-1 font-semibold">{category.skus}</p>
          </div>
          <div className="rounded bg-[#ece6dc] p-2">
            <p className="text-[10px] font-semibold uppercase text-[#605850]">
              Asset Valuation
            </p>
            <p className="mt-1 font-semibold text-[#8c3c3c]">
              {category.valuation}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded bg-[#ece6dc]/70 px-2 py-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 ${hasAlerts ? "text-[#c0392b]" : "text-[#8c3c3c]"}`}
          >
            <FiAlertCircle />
            {category.alert}
          </span>
          <span className="font-mono text-[10px] text-[#605850]">
            Thresh: {category.threshold} units
          </span>
        </div>
        <div className="mt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase text-[#605850]">
            Top Contributor Products:
          </p>
          <div className="flex flex-wrap gap-1">
            {category.products.map((item) => (
              <span
                key={item}
                className="rounded bg-[#ece6dc] px-2 py-1 font-mono text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#d8d0c8] pt-3">
        <span className="text-xs text-[#605850]">
          Hub: {category.warehouse}
        </span>
        <button
          onClick={() => onSelect(category)}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#c2652a] hover:underline"
        >
          Edit Rules <FiArrowRight />
        </button>
      </div>
    </article>
  );
}

function RulePanel({ selected, onSaved }) {
  const [threshold, setThreshold] = useState(selected.threshold);
  const [safety, setSafety] = useState(15);
  const [leadTime, setLeadTime] = useState(7);
  const [autoPurchase, setAutoPurchase] = useState(true);
  const [rebalance, setRebalance] = useState(true);
  const [saved, setSaved] = useState(false);

  // Keep the controls synchronized when a different category is selected.
  useMemo(() => setThreshold(selected.threshold), [selected]);

  function saveRules(event) {
    event.preventDefault();
    setSaved(true);
    onSaved({
      category: selected,
      threshold,
      safety,
      leadTime,
      autoPurchase,
      rebalance,
    });
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#f6f0e8] p-4 shadow-md xl:sticky xl:top-20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FiSliders className="text-[#c2652a]" />
          <h2 className="font-semibold">Reorder Rules & Thresholds</h2>
        </div>
        <span className="rounded bg-[#e6e0d6] px-2 py-1 font-mono text-[11px] text-[#605850]">
          {selected.code}
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-[#ece6dc] p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-[#e6e0d6] text-[#c2652a]">
          <FiSettings />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{selected.name}</h3>
          <p className="text-xs text-[#605850]">{selected.warehouse}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded bg-[#ece6dc] p-2">
          <p className="text-[11px] text-[#605850]">Valuation</p>
          <p className="font-semibold">{selected.valuation}</p>
        </div>
        <div className="rounded bg-[#ece6dc] p-2">
          <p className="text-[11px] text-[#605850]">SKUs Managed</p>
          <p className="font-semibold">{selected.skus}</p>
        </div>
      </div>
      <form onSubmit={saveRules} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="threshold"
              className="text-xs font-semibold uppercase"
            >
              Global Reorder Trigger (Units)
            </label>
            <span className="font-mono text-xs font-bold text-[#78706a]">
              {threshold} units
            </span>
          </div>
          <input
            id="threshold"
            type="range"
            min="20"
            max="1000"
            step="10"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full accent-[#c2652a]"
          />
          <div className="flex justify-between font-mono text-[10px] text-[#605850]">
            <span>20 Units (Lean)</span>
            <span>500 Standard</span>
            <span>1,000 Max</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-semibold uppercase text-[#605850]">
            Safety Buffer (%)
            <input
              type="number"
              value={safety}
              onChange={(e) => setSafety(e.target.value)}
              className="mt-1 w-full rounded bg-[#ece6dc] px-3 py-2 text-sm text-[#3a302a] outline-none focus:ring-2 focus:ring-[#c2652a]/30"
            />
          </label>
          <label className="text-xs font-semibold uppercase text-[#605850]">
            Lead Time (Days)
            <input
              type="number"
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value)}
              className="mt-1 w-full rounded bg-[#ece6dc] px-3 py-2 text-sm text-[#3a302a] outline-none focus:ring-2 focus:ring-[#c2652a]/30"
            />
          </label>
        </div>
        <div className="space-y-3 rounded-lg bg-[#ece6dc] p-3">
          <Toggle
            label="Auto-Purchase Requisition"
            description="Trigger PO generation when critical"
            checked={autoPurchase}
            onChange={setAutoPurchase}
          />
          <Toggle
            label="Multi-Node Stock Rebalance"
            description="Check Reno & Midwest before supplier order"
            checked={rebalance}
            onChange={setRebalance}
          />
        </div>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase text-[#605850]">
            Designated Dept Controller
          </p>
          <div className="flex items-center justify-between rounded bg-[#ece6dc] px-3 py-2">
            <span className="flex items-center gap-2 text-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c2652a] text-[10px] font-bold text-white">
                AC
              </span>
              Alex Chen (Direct Admin)
            </span>
            <span className="font-mono text-[10px] text-[#8c3c3c]">
              AUTHORITY-L1
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {saved ? "✓ Saved Live" : "Save Threshold Rule"}
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              window.alert(
                "Threshold test simulation ran: All 885 SKUs within tolerance bounds.",
              )
            }
          >
            Run Test
          </Button>
        </div>
      </form>
    </section>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-[#605850]">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#c2652a]"
      />
    </label>
  );
}

function CategoryModal({ open, title, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("CAT-NEW-01");
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-60 flex justify-end bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className="flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto bg-[#f2ece4] p-6 shadow-2xl">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="rounded-lg bg-[#e6e0d6] p-2">
              <FiX />
            </button>
          </div>
          <p className="text-sm text-[#605850]">
            Update taxonomical mappings, cross-warehouse replication thresholds,
            and automatic purchasing workflows.
          </p>
          <form
            id="category-modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ name, code });
            }}
            className="space-y-4"
          >
            <label className="block text-xs font-semibold uppercase text-[#605850]">
              Category Label
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Category Group"
                className="mt-1 w-full rounded bg-white px-3 py-3 text-sm normal-case text-[#3a302a] outline-none focus:ring-2 focus:ring-[#c2652a]/30"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs font-semibold uppercase text-[#605850]">
                Taxonomy Code
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 w-full rounded bg-white px-3 py-3 font-mono text-sm normal-case text-[#3a302a]"
                />
              </label>
              <label className="block text-xs font-semibold uppercase text-[#605850]">
                Primary Warehouse
                <select className="mt-1 w-full rounded bg-white px-2 py-3 text-xs normal-case text-[#3a302a]">
                  <option>US-East Warehouse Alpha</option>
                  <option>US-West Reno Distribution</option>
                  <option>Midwest Heavy Yard</option>
                </select>
              </label>
            </div>
            <label className="block text-xs font-semibold uppercase text-[#605850]">
              Threshold Warning Trigger
              <input
                type="number"
                defaultValue="120"
                className="mt-1 w-full rounded bg-white px-3 py-3 text-sm normal-case text-[#3a302a]"
              />
            </label>
            <label className="block text-xs font-semibold uppercase text-[#605850]">
              Critical Emergency Cutoff
              <input
                type="number"
                defaultValue="30"
                className="mt-1 w-full rounded bg-white px-3 py-3 text-sm normal-case text-[#3a302a]"
              />
            </label>
            <label className="flex items-center justify-between rounded-lg bg-white p-3 text-sm">
              Lock Category Hierarchy
              <input type="checkbox" className="h-4 w-4 accent-[#c2652a]" />
            </label>
          </form>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="category-modal-form">
            Commit Changes
          </Button>
        </div>
      </section>
    </div>
  );
}

function ValuationTable({ onAudit }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#f6f0e8] p-4 shadow-sm">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold">
            Department Valuation & Storage Efficiency Audit
          </h2>
          <p className="mt-1 text-xs text-[#605850]">
            Live telemetry calculated against current rack capacity and
            automated procurement cycles
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              window.alert(
                "CSV export can be connected to your inventory data.",
              )
            }
          >
            <FiDownload />
            Export CSV
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.alert("Node recalculation requested.")}
          >
            <FiRefreshCw />
            Force Node Recalculation
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-xs">
          <thead className="bg-white text-[10px] uppercase tracking-wider text-[#605850]">
            <tr>
              {[
                "Category Node",
                "Taxonomy Code",
                "Managed SKUs",
                "Active Valuation",
                "Storage Footprint",
                "Reorder Buffer",
                "Operational Status",
                "Action",
              ].map((x) => (
                <th key={x} className="px-3 py-3">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d8d0c8]">
            {categories
              .filter((c) =>
                [
                  "CAT-0911",
                  "CAT-0402",
                  "CAT-0188",
                  "CAT-0772",
                  "CAT-0655",
                ].includes(c.code),
              )
              .map((c) => (
                <tr key={c.code} className="hover:bg-[#ece6dc]">
                  <td className="px-3 py-3 font-medium">{c.name}</td>
                  <td className="px-3 py-3 font-mono text-[#605850]">
                    {c.code}
                  </td>
                  <td className="px-3 py-3 font-mono">{c.skus}</td>
                  <td className="px-3 py-3 font-semibold text-[#8c3c3c]">
                    {c.valuation}
                  </td>
                  <td className="px-3 py-3 font-mono">
                    {c.storage} ({c.capacity})
                  </td>
                  <td className="px-3 py-3 font-mono">{c.threshold} units</td>
                  <td className="px-3 py-3">
                    <span
                      className={`whitespace-nowrap rounded px-2 py-1 ${c.alertCount ? "bg-[#fce4e0] text-[#c0392b]" : "bg-[#eae2da] text-[#8c3c3c]"}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={() => onAudit(c)}
                      className="font-semibold text-[#78706a] hover:underline"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Categories() {
  const [selected, setSelected] = useState(categories[1]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState({
    open: false,
    title: "Create New Category",
  });
  const [categoryList, setCategoryList] = useState(categories);
  const filtered = useMemo(
    () =>
      categoryList.filter((c) => {
        const matchesSearch = `${c.name} ${c.warehouse} ${c.products.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesFilter =
          filter === "all" ||
          (filter === "alerts" ? c.alertCount > 0 : c.hub === "US-East");
        return matchesSearch && matchesFilter;
      }),
    [categoryList, search, filter],
  );

  function createCategory(data) {
    if (data.name.trim())
      setCategoryList((prev) => [
        ...prev,
        {
          ...categories[0],
          ...data,
          code: data.code || `CAT-${Date.now()}`,
          skus: "0",
          valuation: "$0",
          alertCount: 0,
          alert: "Stock Nominal (0 Alerts)",
          threshold: 120,
          warehouse: "US-East Warehouse Alpha",
          hub: "US-East",
          status: "New Category",
          products: [],
          image: categories[0].image,
        },
      ]);
    setModal({ open: false, title: "Create New Category" });
    window.alert(
      "Category taxonomy and threshold rules committed successfully.",
    );
  }

  function saveRules(data) {
    console.log("Threshold rules:", data);
  }

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-[#ece6dc] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#605850]">
                TAXONOMY ARCHITECTURE v2.4
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#8c3c3c]" />
              <span className="font-mono text-[10px] text-[#8c3c3c]">
                LIVE ALLOCATION
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Inventory Categories & Department Grouping
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-[#605850]">
              Organize products, configure reorder rules, and track department
              valuation across clustered fulfillment nodes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                setModal({ open: true, title: "Configure Reorder Matrix" })
              }
            >
              <FiSliders />
              Audit Reorder Matrix
            </Button>
            <Button
              onClick={() =>
                setModal({ open: true, title: "Create New Category" })
              }
            >
              <FiPlus />
              Create New Category
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="flex flex-col gap-4 xl:col-span-8">
            <div className="flex flex-col justify-between gap-3 rounded-xl bg-[#f6f0e8] p-4 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-[#ece6dc] px-3 py-2">
                <FiFilter className="text-[#9a9088]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter category titles, warehouses, SKU types..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9a9088]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: `All (${categoryList.length})` },
                  {
                    id: "alerts",
                    label: `With Alerts (${categoryList.filter((c) => c.alertCount > 0).length})`,
                  },
                  { id: "east", label: "US-East Only" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={`rounded px-3 py-2 text-xs font-semibold transition ${filter === item.id ? "bg-[#e08850] text-[#3a2020]" : "bg-[#ece6dc] text-[#605850] hover:text-[#3a302a]"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((category) => (
                <CategoryCard
                  key={category.code}
                  category={category}
                  onSelect={setSelected}
                />
              ))}
              {filtered.length === 0 && (
                <p className="rounded-xl bg-[#f6f0e8] p-8 text-center text-sm text-[#605850] md:col-span-2">
                  No categories match your search.
                </p>
              )}
            </div>
          </div>
          <div className="xl:col-span-4">
            <RulePanel
              key={selected.code}
              selected={selected}
              onSaved={saveRules}
            />
          </div>
        </div>
        <ValuationTable onAudit={setSelected} />
      </div>
      <CategoryModal
        open={modal.open}
        title={modal.title}
        onClose={() => setModal({ ...modal, open: false })}
        onSubmit={createCategory}
      />
    </DashboardLayout>
  );
}
