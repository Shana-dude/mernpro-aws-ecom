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
      <header className="bg-zinc-800 text-gray-200 py-4 px-8 shadow-md flex flex-wrap items-center justify-between">
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
              className="px-4 py-1 bg-green-200 hover:bg-green-500 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 bg-green-200 hover:bg-green-500 rounded text-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1 bg-blue-200 hover:bg-blue-500 rounded text-sm"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/addproduct"
            className="px-4 py-1 bg-amber-200 hover:bg-amber-300 text-black rounded text-sm"
          >
            Add Product
          </Link>
        </div>
      </header>

      {/* ================= MAIN (FIXED) ================= */}
      <main className="flex-1 min-h-[70vh] flex justify-center px-4 py-10">
        <div className="w-full max-w-7xl">
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
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="/register" element={<Register />} />

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
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-gray-300 py-14 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h2 className="text-xl font-semibold">SHANA HOME-MADE</h2>
            <p className="mt-4 text-sm">
              Freshly made home products crafted with love.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li>Shop</li>
              <li>Offers</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>Story</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy</li>
              <li>Shipping</li>
              <li>Ingredients</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>Instagram</li>
              <li>WhatsApp</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-700 mt-10 pt-6 text-center text-xs">
          ©2024 Shana Home-Made Products. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
