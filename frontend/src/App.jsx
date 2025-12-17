import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  // 🛒 CART STATE
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔐 AUTH STATE (JWT BASED)
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // 💾 SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="h-25 bg-slate-300 text-black flex items-center justify-between px-6">
        <Link to="/" className="text-4xl font-bold">
          SHANA HOME MADE PRODUCT
        </Link>

        <div className="flex gap-3 items-center">
          <Link to="/cart" className="bg-slate-300 text-black font-semibold text-3xl px-10 py-10 rounded">
            Cart ({cart.length})
          </Link>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-200 text-black font-semibold text-3xl px-10 py-10 rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-200 text-black font-semibold text-3xl px-10 py-10 rounded"
              >
                Register
              </Link>
            </>
          )}

          {/* 🔐 PROTECTED ADD PRODUCT */}
          <Link
            to="/addproduct"
            className="bg-yellow-400 text-black font-semibold text-3xl px-10 py-10 rounded"
          >
            Add Product
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {/* PUBLIC */}
          <Route
            path="/"
            element={<Products cart={cart} setCart={setCart} />}
          />

          <Route
            path="/product/:id"
            element={<Product cart={cart} setCart={setCart} />}
          />

          {/* AUTH */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route path="/register" element={<Register />} />

          {/* PROTECTED */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buynow/:id"
            element={
              <ProtectedRoute>
                <BuyNow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="h-25 bg-slate-300 text-gray-500 text-center text-4xl flex items-center justify-center">
        © SHANA HOME MADE PRODUCT 24
      </footer>
    </div>
  );
}

export default App;
