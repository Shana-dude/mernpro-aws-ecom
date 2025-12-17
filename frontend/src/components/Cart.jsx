export default function Cart({ cart, setCart }) {

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          Your Cart
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-500">
            No items in cart.
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4"
          >
            <div>
              <h3 className="font-semibold">
                {item.name}
              </h3>
              <p className="text-gray-700">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              className="bg-red-200 text-black px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
