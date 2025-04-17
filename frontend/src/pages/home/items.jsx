import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function Items() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center padding">
      {state === "loading" && (
        <div className="w-full h-full bg-green-900 flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      )}

      {state === "success" &&
        items.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
    </div>
  );
}
