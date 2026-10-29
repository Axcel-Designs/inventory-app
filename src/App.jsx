import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="categories" element={<Categories />} />
        <Route path="Products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
