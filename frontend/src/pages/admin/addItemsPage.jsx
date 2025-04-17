import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddItemsPage() {
  const location = useLocation(); // Ensure location is initialized before use
  const navigate = useNavigate();

  // Use optional chaining to prevent errors if location.state is undefined
  const product = location.state || {};

  const [productKey, setProductKey] = useState(product.key || "");
  const [productName, setProductName] = useState(product.name || "");
  const [productPrice, setProductPrice] = useState(product.price || "");
  const [productCategory, setProductCategory] = useState(
    product.category || ""
  );
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productDescription, setProductDescription] = useState(
    product.description || ""
  );
  const [productImage, setProductImage] = useState("");

  // Function to validate form inputs
  function validateForm() {
    if (
      !productKey ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productImage
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (isNaN(productPrice) || productPrice <= 0) {
      toast.error("Price must be a valid number greater than 0.");
      return false;
    }
    if (
      (productWidth && isNaN(productWidth)) ||
      (productHeight && isNaN(productHeight)) ||
      (productDepth && isNaN(productDepth))
    ) {
      toast.error("Dimensions must be valid numbers.");
      return false;
    }
    return true;
  }

  // Function to update an item
  async function handleUpdateItem() {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to update items.");
      return;
    }

    const updatedItem = {
      key: productKey,
      name: productName,
      price: parseFloat(productPrice),
      category: productCategory.split(",").map((category) => category.trim()), // Convert string to array
      dimensions: `${productWidth}*${productHeight}*${productDepth}`,
      description: productDescription,
      imageUrl: productImage,
      availability: true,
    };

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/`,
        updatedItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error updating item");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Item</h1>

      <div className="w-[400px] border border-gray-300 bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Product Price ($)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="Audio">Audio</option>
          <option value="Lights">Lights</option>
        </select>

        <div className="w-full flex gap-2">
          <input
            type="number"
            placeholder="Width"
            value={productWidth}
            onChange={(e) => setProductWidth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Height"
            value={productHeight}
            onChange={(e) => setProductHeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Depth"
            value={productDepth}
            onChange={(e) => setProductDepth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <textarea
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Product Image URL"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="w-full flex gap-2">
          <button
            onClick={handleUpdateItem}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
          >
            <CiCirclePlus size={20} /> Add Item
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
