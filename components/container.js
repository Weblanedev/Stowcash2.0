import React, { useEffect, useState, memo, useContext } from "react";
import { m } from "framer-motion";
import { isBrowser, isMobileSafari, useWindowSize } from "@lib/helpers";
import { pageTransitionSpeed } from "@lib/animate";
import Header from "@components/header";
import Footer from "@components/footer";
import Providers from "context/Providers";
import { useCartContext } from "context/CartContext";
import Image from "next/image";
import urlFor from "helpers/displaySanityImages";
import { formatAmount, generateRandom16DigitNumber } from "utils";
import { useRouter } from "next/router";

const pageTransitionAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: pageTransitionSpeed / 1000,
      delay: 0.2,
      ease: "linear",
      when: "beforeChildren",
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: pageTransitionSpeed / 1000,
      ease: "linear",
      when: "beforeChildren",
    },
  },
};

const Container = ({ site = {}, page = {}, schema, children }) => {
  const router = useRouter()
  // set window height var (w/ safari/iOS hack)
  const { height: windowHeight } = useWindowSize();
  const [lockHeight, setLockHeight] = useState(false);
  const hasChin = isMobileSafari();
  
  // set header height
  const [headerHeight, setHeaderHeight] = useState(null);
  
  useEffect(() => {
    if ((isBrowser && !lockHeight) || !hasChin) {
      document.body.style.setProperty("--vh", `${windowHeight * 0.01}px`);
      setLockHeight(hasChin);
    }
  }, [windowHeight, hasChin]);
  const { openCart, cartToggle, cart, totalItems, removeFromCart, clearCart, totalAmount } =
  useCartContext();
  function payKorapay() {
    if (typeof window !== undefined) {
      window?.Korapay?.initialize({
        key: "pk_test_smiJbLLUZXRfTQYS7AqjKC4T6q7ZFurogNWHYvpg",
        reference: generateRandom16DigitNumber(),
        amount: totalAmount,
        currency: "NGN",
        customer: {
          name: "John Doe",
          email: "eyibrajohnpaul@gmail.com",
        },
        onClose: function () {
          // Handle when modal is closed
        },
        onSuccess: function (data) {
          clearCart()
          cartToggle()
          router.push('/success')
        },
        onFailed: function (data) {
          // Handle when payment fails
        },
        notification_url: "https://example.com/webhook",
      });
    }
  }
  return (
    <>
      <Header
        data={site.header}
        isTransparent={page.hasTransparentHeader}
        onSetup={({ height }) => setHeaderHeight(height)}
      />
      <div className="min-h-screen w-screen relative">
        <main id="">{children}</main>
        {openCart === true && (
          <div className="fixed z-[999] top-0 w-screen h-screen right-0 flex flex-row">
            <div
              className="w-[25%] md:w-1/2 bg-[#8c8c8c70] blur-2xl"
              onClick={() => cartToggle()}
            />
            <div className="w-[75%] md:w-1/2 bg-pageBG shadow-lg shadow-[#373333] border-[1px] border-tl-[#8c8c8c] border-bl-[#8c8c8c] flex flex-col px-4 py-8 text-left h-full">
              <div className="w-full border-b flex flex-row items-center justify-between py-20 px-10">
                <div className="flex flex-row gap-x-10 items-center">
                  <p className="!mb-0">YOUR CART</p>
                  <div className="h-20 w-20 text-center rounded-full border">
                    <p className="text-[#8c8c8c] text-[12px]">
                      {totalItems ?? 0}
                    </p>
                  </div>
                </div>
                <p
                  onClick={() => cartToggle()}
                  className="cursor-pointer hover:scale-[1.1] hover:opacity-80"
                >
                  DONE
                </p>
              </div>

              <div className="px-10 mt-20 h-full">
                {cart?.length === 0 ? (
                  <div>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col w-full h-full">
                    {cart?.map((data, index) => {
                      return (
                        <div key={index} className="mb-20 flex flex-col ">
                          <div className="mb-20 flex flex-row w-full items-center justify-between">
                            <div className="flex flex-row items-center">
                              <div className="relative h-50 w-50 mr-10">
                                <Image
                                  src={data?.image}
                                  layout="fill"
                                  className="h-full w-full"
                                />
                              </div>
                              <div>
                                <p className="!mb-4">{data?.name}</p>
                                <p>₦{formatAmount(data?.price)}</p>
                              </div>
                            </div>
                            <div>
                              <div className="flex flex-row gap-x-3">
                                <p className="!mb-0">Qty:</p>
                                <div className="h-22 w-22 rounded-full border text-center">
                                  <p className="text-[14px]">{data?.amount}</p>
                                </div>
                              </div>
                              <p
                                className="text-[#8c8c8c] text-right cursor-pointer hover:scale-[1.1]"
                                onClick={() => {
                                  removeFromCart(data?.id);
                                }}
                              >
                                Delete
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => clearCart()}
                      className="mt-40 lg:px-20 lg:mr-auto bg-primary p-2 border h-50 text-[14px] hover:opacity-80 text-primary font-bold"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => payKorapay()}
                      className="mt-auto mb-30 lg:px-20 p-2 border h-50 text-pageBG bg-pageText text-[14px] hover:opacity-60 text-primary font-bold "
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Container;
