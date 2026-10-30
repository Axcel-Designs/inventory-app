import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="categories" element={<Categories />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
