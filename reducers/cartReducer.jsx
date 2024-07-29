import urlFor from "helpers/displaySanityImages";

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const { _id, size, amount, product } = action.payload;

    const tempProduct = state.cart.find((i) => i.id === _id);

    if (tempProduct) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === _id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: _id,
        size,
        amount,
        name: product.ProductName,
        image: urlFor(product.Image.asset._ref).url(),
        price: product.ProductPrice,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === "REMOVE_FROM_CART") {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "TOGGLE_AMOUNT") {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === "COUNT_TOTALS") {
    let newItems = 0;
    let newAmount = 0;

    state.cart.forEach((item) => {
      newItems += item.amount;
      newAmount += item.amount * item.price;
    });

    return { ...state, totalItems: newItems, totalAmount: newAmount };
  }

  if (action.type === "IS_CART_OPEN") {
    return { ...state, openCart: !state.openCart };
  }

  return state;
};

export default cartReducer;
