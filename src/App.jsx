import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="categories" element={<Categories />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
