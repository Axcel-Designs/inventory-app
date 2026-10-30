import {
  FiAlertCircle,
  FiBox,
  FiDollarSign,
  FiLayers,
} from "react-icons/fi";

export const dashboardStats = [
  {
    label: "Total Products",
    value: "3,509",
    detail: "+12.5% this month",
    icon: FiBox,
  },
  {
    label: "Total Categories",
    value: "18",
    detail: "+3 added Q2",
    icon: FiLayers,
  },
  {
    label: "Total Inventory Value",
    value: "$4,524,800",
    detail: "+8.4% YoY",
    icon: FiDollarSign,
  },
  {
    label: "Low Stock Alerts",
    value: "18",
    detail: "Across 4 categories",
    icon: FiAlertCircle,
    accent: "text-[#c0392b]",
  },
];

export const recentProducts = [
  {
    name: "Stainless Hex Bolts",
    sku: "SKU-00124",
    category: "Hardware & Fasteners",
    quantity: 450,
    price: "$12.50",
    status: "In Stock",
  },
  {
    name: "LiDAR Scanner v3.1",
    sku: "SKU-00218",
    category: "Electronics",
    quantity: 35,
    price: "$1,250.00",
    status: "Low Stock",
  },
  {
    name: "Shipping Cartons",
    sku: "SKU-00341",
    category: "Packaging",
    quantity: 820,
    price: "$4.50",
    status: "In Stock",
  },
  {
    name: "Aluminium Alloy Bars",
    sku: "SKU-00412",
    category: "Raw Metals",
    quantity: 18,
    price: "$85.00",
    status: "Critical",
  },
];