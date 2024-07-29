"use client";
import {
	createContext,
	useEffect,
	useContext,
	useReducer
} from "react";
import toast from "react-hot-toast";
import cartReducer from "../reducers/cartReducer";

const getCartLocaleStorage =
	(typeof window !== "undefined" &&
		JSON.parse(localStorage.getItem("cart"))) ||
	[];

export const initialState = {
	cart: getCartLocaleStorage,
	totalItems: 0,
	totalAmount: 0,
	shippingFee: 9.99,
	openCart: false
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addToCart = (
		_id,
		amount,
		product
	) => {
		toast.success(`${amount} x ${product.ProductName} added`);
		dispatch({
			type: "ADD_TO_CART",
			payload: { _id, amount, product },
		});
	};

	const removeFromCart = (_id) => {
		toast.error("Product removed from cart");
		dispatch({ type: "REMOVE_FROM_CART", payload: _id });
	};

	const clearCart = () => {
		toast.error("Your cart is now empty");
		dispatch({ type: "CLEAR_CART" });
	};

	const toggleAmount = (_id, value) => {
		dispatch({ type: "TOGGLE_AMOUNT", payload: { _id, value } });
	};
	const cartToggle = () => {
		dispatch({ type: "IS_CART_OPEN" });
	};

	useEffect(() => {
		dispatch({ type: "COUNT_TOTALS" });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeFromCart, clearCart, toggleAmount, cartToggle }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);