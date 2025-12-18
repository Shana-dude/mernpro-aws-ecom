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
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-zinc-900 text-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-semibold hover:text-amber-400"
          >
            🛖 SHANA HOME MADE PRODUCT
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="px-4 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
            >
              Cart ({cart.length})
            </Link>

            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 bg-green-600 hover:bg-green-500 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded"
                >
                  Register
                </Link>
              </>
            )}

            <Link
              to="/addproduct"
              className="px-4 py-1 bg-amber-400 hover:bg-amber-300 text-black rounded"
            >
              Add Product
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <Routes>
            {/* PRODUCTS */}
            <Route
              path="/"
              element={<Products cart={cart} setCart={setCart} />}
            />

            <Route
              path="/product/:id"
              element={<Product cart={cart} setCart={setCart} />}
            />

            {/* AUTH (CENTERED) */}
            <Route
              path="/login"
              element={
                <div className="flex justify-center items-center min-h-[60vh]">
                  <Login setIsLoggedIn={setIsLoggedIn} />
                </div>
              }
            />

            <Route
              path="/register"
              element={
                <div className="flex justify-center items-center min-h-[60vh]">
                  <Register />
                </div>
              }
            />

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
                  <div className="flex justify-center items-center min-h-[60vh]">
                    <AddProduct />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm">
          © 2024 Shana Home-Made Products | All rights reserved
        </div>
      </footer>

    </div>
  );
}

export default App;
