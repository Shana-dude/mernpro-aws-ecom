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

  // 🔐 AUTH STATE
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
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-zinc-800 text-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide hover:text-amber-400 transition"
          >
            🛖 SHANA HOME MADE PRODUCT
          </Link>

          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link
              to="/cart"
              className="px-4 py-1 rounded bg-zinc-200 text-black"
            >
              Cart ({cart.length})
            </Link>

            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-1 bg-green-200 hover:bg-green-400 rounded text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 bg-green-200 hover:bg-green-400 rounded text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-1 bg-blue-200 hover:bg-blue-400 rounded text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}

            <Link
              to="/addproduct"
              className="px-4 py-1 bg-amber-200 hover:bg-amber-300 text-black rounded text-sm font-semibold"
            >
              Add Product
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route
              path="/"
              element={<Products cart={cart} setCart={setCart} />}
            />

            <Route
              path="/product/:id"
              element={<Product cart={cart} setCart={setCart} />}
            />

            <Route
              path="/login"
              element={
                <div className="min-h-[60vh] flex justify-center items-center">
                  <Login setIsLoggedIn={setIsLoggedIn} />
                </div>
              }
            />

            <Route
              path="/register"
              element={
                <div className="min-h-[60vh] flex justify-center items-center">
                  <Register />
                </div>
              }
            />

            <Route
              path="/addproduct"
              element={
                <ProtectedRoute>
                  <div className="min-h-[60vh] flex justify-center items-center">
                    <AddProduct />
                  </div>
                </ProtectedRoute>
              }
            />

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
          </Routes>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm">
          © 2024 Shana Home-Made Products. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default App;
