import urlFor from "helpers/displaySanityImages";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatAmount } from "utils";
import { useCartContext } from "context/CartContext";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const e = product;
  const { addToCart } = useCartContext();
  const amount = 1;
  const { _id } = e;
  return (
    <div className={`w-full cursor-pointer `}>
      <div className="!relative h-[300px] md:h-[300px]">
        <Image
          onClick={() => router.push(`products/${e._id}`)}
          src={
            urlFor(e?.ProductImages[0].asset?._ref).url() ??
            "/apple-touch-icon.png"
          }
          className="w-full object-cover hover:scale-[1.1] hover:transition-all ease-in-out duration-300"
          layout="fill"
          alt={"Product Image"}
        />
      </div>
      <div className="mt-15 w-full mx-6 my-4 flex flex-col ">
        <p className="!mb-[2px] text-4xl font-[500]">{e?.ProductName}</p>
        <p className="mt-2">${formatAmount(e?.ProductPrice)}</p>
      </div>
      <button
        onClick={() => addToCart(_id, amount, product)}
    className="w-[100%] mt-[20px] py-[15px] px-[40px] text-[20px] border text-pageText border-pageText bg-transparent rounded-full"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
