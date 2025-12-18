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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-semibold hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <span className="text-2xl">🛖</span>
              <span className="hidden sm:inline">SHANA HOME MADE PRODUCT</span>
              <span className="sm:hidden">SHANA</span>
            </Link>

            {/* Navigation Buttons */}
            <nav className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/cart"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded bg-zinc-700 hover:bg-zinc-600 transition-colors font-medium"
              >
                Cart ({cart.length})
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 hover:bg-red-500 rounded transition-colors font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 hover:bg-green-500 rounded transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-500 rounded transition-colors font-medium"
                  >
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/addproduct"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-amber-400 hover:bg-amber-300 text-black rounded transition-colors font-medium"
              >
                Add Product
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col">
        <Routes>
          {/* PRODUCTS - Full Width */}
          <Route
            path="/"
            element={
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <Products cart={cart} setCart={setCart} />
              </div>
            }
          />

          <Route
            path="/product/:id"
            element={
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <Product cart={cart} setCart={setCart} />
              </div>
            }
          />

          {/* AUTH (CENTERED WITH FULL HEIGHT) */}
          <Route
            path="/login"
            element={
              <div className="flex-1 flex justify-center items-center px-4 py-8">
                <Login setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />

          <Route
            path="/register"
            element={
              <div className="flex-1 flex justify-center items-center px-4 py-8">
                <Register />
              </div>
            }
          />

          {/* PROTECTED - Full Width */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
                  <Cart cart={cart} setCart={setCart} />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/buynow/:id"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
                  <BuyNow />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <div className="flex-1 flex justify-center items-center px-4 py-8">
                  <AddProduct />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center text-sm">
          <p>© 2024 Shana Home-Made Products | All rights reserved</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
