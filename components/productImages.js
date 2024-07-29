"use client";
import { useState } from "react";
import Image from "next/image";
import urlFor from "helpers/displaySanityImages";

const ProductImages = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.[0]);
  
  return (
    <section className={"w-full flex flex-col"}>
      <Image
        src={urlFor(mainImg?.asset?._ref)?.url() ?? "/apple-touch-icon.png"}
        alt="product main image"
        width={600}
        height={600}
        className={`w-full h-full rounded-[5px] object-cover`}
      />
      <div className={"grid grid-cols-4 gap-5 mt-10"}>
        {images?.map((image, index) => (
          <Image
            key={index}
            src={urlFor(image?.asset?._ref).url()}
            alt="product alt image"
            width={600}
            height={600}
            onClick={() => setMainImg(images[index])}
            className={`cursor-pointer rounded-lg h-[4rem] md:h-[5rem] w-full object-cover ${
              urlFor(mainImg?.asset?._ref).url() ===
                urlFor(image?.asset?._ref).url() && `opacity-50`
            }`}
          />
        ))}
      </div>
    </section>
  );
};
export default ProductImages;
