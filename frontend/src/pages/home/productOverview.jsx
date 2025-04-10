import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
	const params = useParams();
	const key = params.key;
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
			.then((res) => {
				setProduct(res.data);
				setLoadingStatus("loaded");
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
				setLoadingStatus("error");
			});
	}, []);
	return (
		<div className="w-full flex justify-center">
			{loadingStatus == "loading" && (
				<div className="w-full h-full flex justify-center items-center">
					<div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
				</div>
			)}
			{loadingStatus == "loaded" && (
				<div className=" w-full h-full  flex  flex-col md:flex-row justify-center items-center">
					<h1 className="text-2xl my-6 md:hidden  font-bold text-accent text-center ">{product.name}</h1>
                    <div className="w-full md:w-[49%]">
						<ImageSlider images={product.image} />
					</div>
					<div className="w-full md:w-[49%] p-2 flex flex-col items-center">
						<h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
						<h2 className="text-xl font-semibold text-gray-800">
							{product.category} category
						</h2>
						<p className="text-gray-700 mt-4 text-center">{product.description}</p>
						<p className="text-lg  text-green-500">Rs. {product.price.toFixed(2)}</p>
						<div className="mt-4 text-sm text-gray-600">
							<span className="font-medium">Dimensions:</span>{" "}
							{product.dimensions}
						</div>
						<button
							className="mt-4 bg-accent text-white px-4 py-2 rounded-md"
							onClick={() => {
								addToCart(product.key, 1);
								toast.success("Added to Cart");
								console.log(loadCart());
							}}
						>
							Add to Cart
						</button>
					</div>
				</div>
			)}
			{loadingStatus == "error" && (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="text-3xl font-bold text-accent">Error Occured</h1>
				</div>
			)}
		</div>
	);
}
