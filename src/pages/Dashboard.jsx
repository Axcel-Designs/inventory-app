import {
  FiActivity,
  FiAlertCircle,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";

import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import Button from "../components/ui/Button";
import { dashboardStats, recentProducts } from "../data/data";


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-[#ece6dc] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#605850]">
              INVENTORY MANAGEMENT
            </span>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-[#605850]">
              Monitor your inventory, products, stock levels, and warehouse
              performance.
            </p>
          </div>

          <Button>
            <FiActivity />
            Generate Report
          </Button>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* Overview sections */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Inventory overview */}
          <div className="rounded-xl bg-[#f6f0e8] p-5 shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Inventory Overview</h2>
                <p className="mt-1 text-xs text-[#605850]">
                  Current inventory distribution
                </p>
              </div>

              <FiTrendingUp className="h-5 w-5 text-[#8c3c3c]" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-[#ece6dc] p-5">
                <p className="text-xs text-[#605850]">Total Stock Quantity</p>
                <h3 className="mt-2 text-3xl font-semibold">24,850</h3>
                <p className="mt-2 text-xs text-[#8c3c3c]">
                  Units across all warehouses
                </p>
              </div>

              <div className="rounded-xl bg-[#ece6dc] p-5">
                <p className="text-xs text-[#605850]">Available Stock</p>
                <h3 className="mt-2 text-3xl font-semibold">22,410</h3>
                <p className="mt-2 text-xs text-[#8c3c3c]">
                  90.1% of total inventory
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold">Warehouse Capacity</span>
                <span className="text-[#605850]">72%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#e6e0d6]">
                <div className="h-full w-[72%] rounded-full bg-[#c2652a]" />
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-xl bg-[#f6f0e8] p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="text-[#c0392b]" />
              <h2 className="font-semibold">Stock Alerts</h2>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Critical stock",
                  description: "4 products need immediate attention",
                  count: "04",
                },
                {
                  title: "Low stock",
                  description: "14 products below reorder level",
                  count: "14",
                },
                {
                  title: "Out of stock",
                  description: "No products currently out of stock",
                  count: "00",
                },
              ].map((alert) => (
                <div
                  key={alert.title}
                  className="flex items-center justify-between border-b border-[#d8d0c8] pb-3 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="mt-1 text-xs text-[#605850]">
                      {alert.description}
                    </p>
                  </div>

                  <span className="font-mono text-sm font-bold text-[#c0392b]">
                    {alert.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent products */}
        <section className="rounded-xl bg-[#f6f0e8] p-5 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold">Recent Products</h2>
              <p className="mt-1 text-xs text-[#605850]">
                A quick overview of recently added inventory
              </p>
            </div>

            <Button variant="secondary">
              View All Products <FiArrowRight />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-sm">
              <thead className="bg-white text-xs uppercase text-[#605850]">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#d8d0c8]">
                {recentProducts.map((product) => (
                  <tr key={product.sku} className="hover:bg-[#ece6dc]">
                    <td className="px-4 py-4 font-medium">{product.name}</td>
                    <td className="px-4 py-4 font-mono text-xs">
                      {product.sku}
                    </td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">{product.quantity}</td>
                    <td className="px-4 py-4">{product.price}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          product.status === "In Stock"
                            ? "bg-[#eae2da] text-[#8c3c3c]"
                            : "bg-[#fce4e0] text-[#c0392b]"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}