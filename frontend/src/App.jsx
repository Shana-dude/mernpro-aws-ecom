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
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <header className="bg-zinc-900 text-white shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold hover:text-amber-400 transition-colors">
              <span>🛖</span>
              <span className="hidden sm:inline">SHANA HOME MADE PRODUCT</span>
              <span className="sm:hidden">SHANA</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2 sm:gap-3">
              <Link 
                to="/cart" 
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors"
              >
                Cart ({cart.length})
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-green-600 hover:bg-green-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/addproduct"
                className="bg-amber-500 hover:bg-amber-400 text-black px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition-colors"
              >
                Add Product
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 w-full bg-gray-50">
        <Routes>
          {/* PUBLIC */}
          <Route
            path="/"
            element={
              <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 py-8">
                <Products cart={cart} setCart={setCart} />
              </div>
            }
          />

          <Route
            path="/product/:id"
            element={
              <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 py-8">
                <Product cart={cart} setCart={setCart} />
              </div>
            }
          />

          {/* AUTH */}
          <Route
            path="/login"
            element={
              <div className="w-full h-full flex justify-center items-center px-4 py-20">
                <Login setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />

          <Route 
            path="/register" 
            element={
              <div className="w-full h-full flex justify-center items-center px-4 py-20">
                <Register />
              </div>
            } 
          />

          {/* PROTECTED */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 py-8">
                  <Cart cart={cart} setCart={setCart} />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/buynow/:id"
            element={
              <ProtectedRoute>
                <div className="w-full min-h-full px-4 sm:px-6 lg:px-8 py-8">
                  <BuyNow />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <div className="w-full h-full flex justify-center items-center px-4 py-20">
                  <AddProduct />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-gray-300 w-full mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-white">SHANA HOME-MADE</h2>
              <p className="mt-4 text-sm leading-6 text-gray-400">
                Freshly made home products crafted with love —  
                pure, safe and full of natural goodness.
              </p>
              <button className="mt-3 text-sm text-amber-400 hover:text-amber-300 transition-colors">
                read more →
              </button>
            </div>

            {/* Discover */}
            <div>
              <h3 className="font-semibold text-white mb-3">Discover</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Shop</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Our Products</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Special Offers</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Support</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold text-white mb-3">About</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Team</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Blog</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Ingredients</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Hand-Made Quality</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Shipping</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Privacy</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-white mb-3">Social</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Facebook</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">Instagram</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">WhatsApp</li>
                <li className="hover:text-amber-400 transition-colors cursor-pointer">YouTube</li>
              </ul>
            </div>
          </div>

          {/* Partners */}
          <div className="border-t border-zinc-700 mt-10 pt-6 text-sm text-center">
            <p className="text-zinc-400">Our Partners:</p>
            <p className="mt-2 space-x-4">
              <span className="text-gray-400">Partner 01</span>
              <span className="text-gray-400">Partner 02</span>
              <span className="text-gray-400">Partner 03</span>
              <span className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors">See All →</span>
            </p>
          </div>

          {/* Bottom */}
          <div className="border-t border-zinc-700 mt-8 pt-6 flex flex-col md:flex-row justify-between text-xs text-zinc-500">
            <p>©2024 Shana Home-Made Products | All rights reserved</p>
            <div className="space-x-6 mt-4 md:mt-0">
              <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-amber-400 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-amber-400 cursor-pointer transition-colors">Compliance</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
