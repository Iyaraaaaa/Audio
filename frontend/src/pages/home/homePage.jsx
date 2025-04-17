import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-100px)] w-full  ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Items />} />
          {/* <Route path="/*" element={<ErrorNotFound />} /> */}
          {/* Wildcard route for invalid paths */}
        </Routes>
      </div>
    </>
  );
}

function Home() {
  return (
    <div
      className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-white px-4"
      style={{ backgroundImage: "url('home.jpg')" }} // Change to your image path
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Home Page</h1>

      <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">OUR VISION</h2>
        <p className="text-lg">
          To be the most reliable and customer-friendly audio equipment rental
          service, providing high-quality sound solutions for every occasion,
          ensuring seamless experiences with top-tier equipment and exceptional
          service.
        </p>
      </div>
    </div>
  );
}
