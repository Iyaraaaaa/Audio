import { Link } from "react-router-dom"; // ✅ Import Link

export default function ErrorNotFound() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-red-600">
        404 Error: Page Not Found
      </h1>
      <Link
        className="bg-yellow-600 text-white px-4 py-2 mt-4 inline-block rounded"
        to="/"
      >
        Go back to Home
      </Link>
    </div>
  );
}
