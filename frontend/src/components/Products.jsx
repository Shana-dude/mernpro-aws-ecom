import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch all products
  useEffect(() => {
    fetch(`${API}/api/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔹 Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // 🔹 Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // 🔹 View product (login required)
  const handleView = (productId) => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (isLoggedIn) {
      navigate(`/product/${productId}`);
    } else {
      navigate("/login", { state: { from: `/product/${productId}` } });
    }
  };

  // 🔥 DELETE PRODUCT (JWT PROTECTED)
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API}/api/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        alert("Not authorized or delete failed");
        return;
      }

      alert("Product deleted successfully");

      // 🔄 Update UI instantly
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setCart((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="w-full bg-gray-100 py-10 px-6">
      <h2 className="text-10xl font-semibold text-center mb-10">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((p) => {
          const isInCart = cart.some((item) => item._id === p._id);

          return (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow p-5 flex flex-col min-h-[380px]"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-40 w-full object-contain mb-4"
              />

              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-sm text-gray-700 mb-4">₹{p.price}</p>

              <button
                onClick={() => handleView(p._id)}
                className="bg-blue-100 text-black py-2 rounded hover:bg-blue-600"
              >
                VIEW
              </button>

              {isInCart ? (
                <button
                  onClick={() => removeFromCart(p._id)}
                  className="mt-3 bg-yellow-100 text-black py-2 rounded font-semibold"
                >
                  REMOVE
                </button>
              ) : (
                <button
                  onClick={() => addToCart(p)}
                  className="mt-3 bg-green-100 text-black py-2 rounded font-semibold"
                >
                  ADD TO CART
                </button>
              )}

              <button
                onClick={() => deleteProduct(p._id)}
                className="mt-3 bg-red-100 text-black py-2 rounded font-semibold hover:bg-red-600"
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
