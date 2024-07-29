"use client";

import { useState } from "react";
import AmountButtons from "./amountButtons";
import { useCartContext } from "context/CartContext";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id, stock = 10 } = product;
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((prev) => {
      let tempAmount = prev + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((prev) => {
      let tempAmount = prev - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <section>
      <div className={"flex flex-row gap-x-4 items-center"}>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <button
          onClick={() => addToCart(_id, amount, product)}
          className="px-10 lg:px-20 lg:mr-auto bg-primary p-2 border h-50 text-[14px] hover:opacity-80 text-primary font-bold"
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};
export default AddToCart;
