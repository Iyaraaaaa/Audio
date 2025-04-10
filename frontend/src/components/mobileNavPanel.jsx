import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();

	function goTo(route) {
		navigate(route);
		setOpen(false);
	}

	return (
		<>
			{isOpen && (
				<div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50">
					<div className="h-full bg-white w-[300px] shadow-lg">
						{/* Header */}
						<div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
							<img
								src="/logo.png"
								alt="logo"
								className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
							/>
							<IoMdClose
								className="absolute right-3 text-3xl cursor-pointer"
								onClick={() => {
									setOpen(false);
								}}
							/>
						</div>

						{/* Navigation Links */}
						<div
							onClick={() => {
								goTo("/");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiHome className="text-2xl" />
							Home
						</div>
                        <div
							onClick={() => {
								goTo("/items");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiSpeaker className="text-2xl" />
							Items
						</div>

						<div
							onClick={() => {
								goTo("/gallery");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdPhotoLibrary className="text-2xl" />
							Gallery
						</div>                        

						<div
							onClick={() => {
								goTo("/booking");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<FaRegCalendarCheck className="text-2xl" />
							Booking
						</div>

						<div
							onClick={() => {
								goTo("/contact");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdContacts className="text-2xl" />
							Contact
						</div>

						<div
							onClick={() => {
								goTo("/about");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdInfoOutline className="text-2xl" />
							About
						</div>
					</div>
				</div>
			)}
		</>
	);
}
