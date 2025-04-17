// import "./productCard.css";
export default function ProductCard({ item }) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 border border-gray-200 relative ">
      {/* Product Image */}
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 text-sm mb-2">
          Category: {item.category.join(", ")}
        </p>
        <p className="text-gray-500 text-sm">Dimensions: {item.dimensions}</p>
        <p className="text-gray-700 mt-2">{item.description}</p>
      </div>

      {/* Price and Availability */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-blue-600">
          LKR {item.price}
        </span>
        {item.availability ? (
          <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
            In Stock
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Buy Now Button */}
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Buy Now
      </button>
    </div>
  );
}
