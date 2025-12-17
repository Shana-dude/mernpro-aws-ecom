import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Product({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/product`)
      .then((res) => res.json())
      .then((products) => {
        const found = products.find((p) => p._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-5xl font-semibold">
        Product not found
      </div>
    );
  }

  const isInCart = cart?.some(
    (item) => item._id === product._id
  );

  const addToCart = () => {
    setCart([...cart, product]);
  };

  const removeFromCart = () => {
    setCart(cart.filter((item) => item._id !== product._id));
  };

  const deleteProduct = async () => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(`${API}/api/deleteproduct/${product._id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setCart(cart.filter((item) => item._id !== product._id));
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-6 py-12">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* IMAGE SECTION */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[450px] w-auto object-contain"
          />
        </div>

        {/* DETAILS SECTION */}
        <div className="flex flex-col gap-6">

          <h2 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h2>

          <p className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 mt-6">

            <Link
              to={`/buynow/${product._id}`}
              className="w-full bg-blue-200 text-black text-lg font-semibold
                         text-center py-4 rounded-lg
                         hover:bg-blue-700 transition"
            >
              BUY NOW
            </Link>

            {isInCart ? (
              <button
                onClick={removeFromCart}
                className="w-full bg-yellow-100 text-black text-lg font-semibold
                           py-4 rounded-lg
                           hover:bg-yellow-500 transition"
              >
                REMOVE FROM CART
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="w-full bg-green-100 text-black text-lg font-semibold
                           py-4 rounded-lg
                           hover:bg-green-700 transition"
              >
                ADD TO CART
              </button>
            )}

            <button
              onClick={deleteProduct}
              className="w-full bg-red-100 text-black text-lg font-semibold
                         py-4 rounded-lg
                         hover:bg-red-700 transition"
            >
              DELETE
            </button>

            <Link
              to="/"
              className="w-full border border-gray-400 text-center text-lg
                         py-4 rounded-lg hover:bg-gray-200 transition"
            >
              BACK TO PRODUCTS
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
