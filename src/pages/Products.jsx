import { useMemo, useState } from "react";
import {
  FiBox,
  FiDownload,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";

import DashboardLayout from "../layout/DashboardLayout";
import Button from "../components/ui/Button";

const initialProducts = [
  {
    id: 1,
    name: "Stainless Hex Bolts",
    sku: "SKU-00124",
    category: "Hardware & Fasteners",
    quantity: 450,
    price: 12.5,
    status: "In Stock",
  },
  {
    id: 2,
    name: "LiDAR Scanner v3.1",
    sku: "SKU-00218",
    category: "Electronics",
    quantity: 35,
    price: 1250,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Shipping Cartons",
    sku: "SKU-00341",
    category: "Packaging",
    quantity: 820,
    price: 4.5,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Aluminium Alloy Bars",
    sku: "SKU-00412",
    category: "Raw Metals",
    quantity: 18,
    price: 85,
    status: "Critical",
  },
  {
    id: 5,
    name: "Industrial Lubricant",
    sku: "SKU-00521",
    category: "Chemical & Lubricants",
    quantity: 120,
    price: 35,
    status: "In Stock",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus = status === "All" || product.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((current) => current.filter((product) => product.id !== id));
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-[#ece6dc] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#605850]">
              INVENTORY MANAGEMENT
            </span>

            <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-[#605850]">
              Manage your products, monitor stock levels, and update inventory.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">
              <FiDownload /> Export
            </Button>

            <Button>
              <FiPlus /> Add Product
            </Button>
          </div>
        </div>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Products"
            value={products.length}
            icon={FiBox}
          />

          <SummaryCard
            label="In Stock"
            value={products.filter((p) => p.status === "In Stock").length}
            icon={FiBox}
          />

          <SummaryCard
            label="Low / Critical Stock"
            value={
              products.filter((p) =>
                ["Low Stock", "Critical"].includes(p.status)
              ).length
            }
            icon={FiFilter}
          />
        </section>

        {/* Products table */}
        <section className="rounded-xl bg-[#f6f0e8] p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#ece6dc] px-3 py-2">
              <FiSearch className="text-[#9a9088]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products or SKU..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9a9088]"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg bg-[#ece6dc] px-3 py-2 text-sm outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg bg-[#ece6dc] px-3 py-2 text-sm outline-none"
            >
              {["All", "In Stock", "Low Stock", "Critical"].map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Statuses" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Product Inventory</h2>
            <span className="text-xs text-[#605850]">
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-white text-xs uppercase tracking-wider text-[#605850]">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#d8d0c8]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#ece6dc]">
                    <td className="px-4 py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="px-4 py-4 font-mono text-xs text-[#605850]">
                      {product.sku}
                    </td>

                    <td className="px-4 py-4">{product.category}</td>

                    <td className="px-4 py-4">{product.quantity}</td>

                    <td className="px-4 py-4">
                      {formatCurrency(product.price)}
                    </td>

                    <td className="px-4 py-4">
                      <StockBadge status={product.status} />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          title="Edit product"
                          className="rounded-lg p-2 text-[#605850] hover:bg-[#e6e0d6]"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          title="Delete product"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-2 text-[#c0392b] hover:bg-[#fce4e0]"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-sm text-[#605850]"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-[#f6f0e8] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#605850]">
          {label}
        </p>
        <Icon className="h-5 w-5 text-[#78706a]" />
      </div>

      <p className="mt-4 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function StockBadge({ status }) {
  const styles = {
    "In Stock": "bg-[#eae2da] text-[#8c3c3c]",
    "Low Stock": "bg-[#fce4e0] text-[#c0392b]",
    Critical: "bg-[#c0392b] text-white",
  };

  return (
    <span className={`rounded px-2 py-1 text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}