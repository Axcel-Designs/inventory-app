import { NavLink } from "react-router";
import {
  FiBarChart2,
  FiBox,
  FiGrid,
  FiLayers,
  FiSettings,
  FiWarehouse,
  FiX,
} from "react-icons/fi";

const links = [
  { label: "Dashboard", icon: FiGrid, path: "/" },
  { label: "Products", icon: FiBox, path: "/products" },
  { label: "Categories", icon: FiLayers, path: "/categories" },
  { label: "Warehouses", icon: FiWarehouse, path: "/warehouses" },
  { label: "Reports", icon: FiBarChart2, path: "/reports" },
  { label: "Settings", icon: FiSettings, path: "/settings" },
];

export default function Sidebar({ open = false, onClose }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 flex w-64 flex-col justify-between bg-[#f6f0e8] p-4 shadow-sm transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="font-semibold">Navigation</span>
            <button onClick={onClose} aria-label="Close navigation">
              <FiX />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-[#e08850] font-semibold text-[#3a2020]"
                      : "text-[#605850] hover:bg-[#ece6dc]"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="rounded-xl bg-white p-4">
          <div className="mb-1 flex justify-between text-[11px] font-bold tracking-wider text-[#605850]">
            <span>SYNC STATUS</span>
            <span className="text-[#8c3c3c]">OK</span>
          </div>
          <p className="text-xs text-[#3a302a]">v2.4.1 Node-Cluster</p>
        </div>
      </aside>
    </>
  );
}
