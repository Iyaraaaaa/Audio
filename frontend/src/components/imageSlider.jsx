import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    console.log(images);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full flex flex-col items-center ">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover"/>
            <div className="w-full mt-[20px] h-[90px] flex justify-center items-center">
                {
                    images.map((image,index)=>{
                        return <img key={index} src={image} alt="product" className={`w-[70px] h-[70px] mr-[2px] object-cover cursor-pointer ${image == selectedImage && "border border-accent"}`} onClick={
                            ()=>{
                                setSelectedImage(image);
                            }
                        }/>
                    })
                }
            </div>

        </div>
    )
}