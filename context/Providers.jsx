"use client";
//import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./CartContext";

const Providers = ({ children }) => {
  return (
    // <AuthProvider>
    <CartProvider>
      <Toaster toastOptions={{ duration: 3000 }} />
      {children}
    </CartProvider>
    // </AuthProvider>
  );
};
export default Providers;
