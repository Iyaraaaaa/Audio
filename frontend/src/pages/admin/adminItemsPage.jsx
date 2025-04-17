import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch items from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched data:", res.data);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle item deletion
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.key !== key));

      const token = localStorage.getItem("token");
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error("Error deleting item:", err));
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      {/* Loader (Shows while fetching data) */}
      {loading && (
        <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-16 h-16"></div>
      )}

      {!loading && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Admin Items
          </h1>

          {/* Items Table */}
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
                <th className="p-3 border">Key</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Price ($)</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Dimensions (W×H×D cm)</th>
                <th className="p-3 border">Availability</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.key}>
                  <td className="p-3 border">{product.key}</td>
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">{product.price}</td>
                  <td className="p-3 border">{product.category?.join(", ")}</td>
                  <td className="p-3 border">{product.dimensions} CM</td>
                  <td className="p-3 border">
                    {product.availability ? "Available" : "Out of Stock"}
                  </td>
                  <td className="p-3 border flex justify-center space-x-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/items/edit`, { state: product })
                      }
                    >
                      <FiEdit className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl transition duration-200" />
                    </button>
                    <button onClick={() => handleDelete(product.key)}>
                      <FiTrash2 className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition duration-200" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Button */}
      <Link to="/admin/items/add">
        <CiCirclePlus className="text-[70px] absolute right-4 bottom-4 text-gray-700 hover:text-red-900 transition-all duration-300" />
      </Link>
    </div>
  );
}
