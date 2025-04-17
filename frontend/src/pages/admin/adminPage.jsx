import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Routes, Route, Link } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage"; // Your Admin Items component
import AddItemsPage from "./addItemsPage"; // Your Add Items component
import UpdateItemsPage from "./updateItemPage"; // Your Update Items component

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[200px] h-full bg-green-200 p-4 flex flex-col gap-2">
        <Link
          to="/admin/dashboard"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <BsGraphDown /> Dashboard
        </Link>

        <Link
          to="/admin/bookings"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <FaRegBookmark /> Booking
        </Link>

        <Link
          to="/admin/items"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <MdOutlineSpeaker /> Items
        </Link>

        <Link
          to="/admin/users"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <FaRegUser /> Users
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[calc(100vw-200px)] p-4 bg-gray-100 text-black">
        <Routes>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/bookings" element={<h1>Booking</h1>} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/items/add" element={<AddItemsPage />} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/items/edit" element={<UpdateItemsPage />} />
        </Routes>
      </div>
    </div>
  );
}
