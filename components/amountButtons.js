import { FaMinus, FaPlus } from "react-icons/fa";

const AmountButtons = ({ amount, increase, decrease, cartView }) => {
  return (
    <div
      className={`h-[50px] border grid grid-cols-3 w-[120px] text-center items-center ${
        cartView && "w-[80px]"
      }`}
    >
      <button
        type="button"
        onClick={decrease}
        aria-label="Minus"
        className="h-full hover:opacity-80"
      >
        <FaMinus />
      </button>
      <span>{amount}</span>
      <button
        type="button"
        onClick={increase}
        aria-label="Plus"
        className="h-full hover:opacity-80"
      >
        <FaPlus />
      </button>
    </div>
  );
};
export default AmountButtons;
