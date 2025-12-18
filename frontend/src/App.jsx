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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-slate-200 py-4 px-6 shadow-sm flex flex-wrap items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-blue-700">
          🛖 SHANA HOME MADE PRODUCT
        </Link>

        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link
            to="/cart"
            className="text-xl font-semibold px-3 py-1 rounded bg-blue-100"
          >
            Cart ({cart.length})
          </Link>

          {isLoggedIn ? (
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-400 text-black font-semibold px-3 py-1 rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-400 text-white font-semibold px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/addproduct"
            className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded"
          >
            Add Product
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 px-4 py-6">
        <Routes>
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
      <footer className="bg-zinc-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold">SHANA HOME-MADE</h2>
            <p className="mt-4 text-sm leading-6">
              Freshly made home products crafted with love —
              pure, safe and full of natural goodness.
            </p>
            <button className="mt-3 text-sm text-amber-400 hover:text-amber-300">
              read more →
            </button>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold mb-3">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li>Shop</li>
              <li>Our Products</li>
              <li>Special Offers</li>
              <li>Support</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li>Our Story</li>
              <li>Team</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>Ingredients</li>
              <li>Hand-Made Quality</li>
              <li>Shipping</li>
              <li>Privacy</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Social</h3>
            <ul className="space-y-2 text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>WhatsApp</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="border-t border-zinc-700 mt-10 pt-6 text-sm text-center">
          <p className="text-zinc-400">Our Partners:</p>
          <p className="mt-2 space-x-4">
            <span>Partner 01</span>
            <span>Partner 02</span>
            <span>Partner 03</span>
            <span className="text-amber-300 cursor-pointer">See All →</span>
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-700 mt-8 pt-6 flex flex-col md:flex-row justify-between text-xs text-zinc-500">
          <p>©2024 Shana Home-Made Products | All rights reserved</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
