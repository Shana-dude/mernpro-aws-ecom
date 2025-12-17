import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../utils/api";

export default function BuyNow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/product`)
      .then((res) => res.json())
      .then((allproducts) => {
        const found = allproducts.find((p) => p._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Product not found
      </p>
    );
  }

  return (
    // 🔽 BELOW HEADER (NO CENTER ALIGN)
    <div className="w-full min-h-screen bg-gray-100 px-6 py-12">
      
      <div className="max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Order Confirmation
        </h2>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-6">

          {/* PRODUCT NAME */}
          <h3 className="text-2xl font-semibold">
            {product.name}
          </h3>

          {/* PRICE */}
          <p className="text-3xl font-bold text-green-600">
            ₹{product.price}
          </p>

          {/* SUCCESS MESSAGE */}
          <div className="bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-lg text-lg">
            ✅ Your order has been placed successfully!
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link
              to="/"
              className="bg-slate-300 text-black px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Continue Shopping
            </Link>

            <Link
              to="/cart"
              className="bg-blue-200 text-black px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View Cart
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
