import React, { useState, useRef, useEffect, useContext } from "react";
import { m } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { useInView } from "react-cool-inview";
import { useRect } from "@reach/rect";
import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";

import { isBrowser } from "@lib/helpers";

import {
  useSiteContext,
  useToggleMegaNav,
  useToggleCart,
  useCartCount,
} from "@lib/context";

import PromoBar from "@components/promo-bar";
import Menu from "@components/menu";
import MegaNavigation from "@components/menu-mega-nav";
import Icon from "@components/icon";
import { useCartContext } from "context/CartContext";
import Image from "next/image";

const Header = ({ data = {}, isTransparent, onSetup = () => {} }) => {
  // expand our header data
  const {
    promo,
    menuDesktopLeft,
    menuDesktopRight,
    menuMobilePrimary,
    menuMobileSecondary,
  } = data;

  // setup states
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(null);
  const { observe, inView: observerIsVisible } = useInView();
  const headerRef = useRef();
  const headerRect = useRect(headerRef);
  const router = useRouter();

  // setup menu toggle event
  const toggleMobileNav = (state) => {
    setMobileNavOpen(state);

    if (isBrowser) {
      document.body.classList.toggle("overflow-hidden", state);
    }
  };

  // context helpers
  const { meganav } = useSiteContext();
  const toggleMegaNav = useToggleMegaNav();

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height);
    }
  }, [headerRect]);

  useEffect(() => {
    onSetup({ height: headerHeight });
  }, [headerHeight]);

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <PromoBar data={promo} />

      <header
        className={cx("header relative z-[10]", {
          "is-overlay": isTransparent,
          "is-white": isTransparent && !meganav.isOpen && observerIsVisible,
          "has-bg": !observerIsVisible,
        })}
      >
        <div ref={headerRef} className="header--outer">
          <div className="header--inner">
            <div className="header--content">
              <div className="logo">
                {router.pathname === "/" ? (
                  <button
                    className="logo--link"
                    aria-label="Go Home"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Image src={"/logo.png"} width={50} height={50} className="h-[50px] w-[50px]" />
                  </button>
                ) : (
                  <Link href="/" scroll={false}>
                    <p className="logo--link" aria-label="Go Home">
                    <Image src={"/logo.png"} width={50} height={50} className="h-[50px] w-[50px]" />
                    </p>
                  </Link>
                )}
              </div>

              <nav className="main-navigation" role="navigation">
                {/* Mobile Header Menu */}
                <div id="mobile-nav" className="main-navigation--mobile">
                  <FocusTrap active={isMobileNavOpen}>
                    <div>
                      <button
                        onClick={() => toggleMobileNav(!isMobileNavOpen)}
                        className={cx("menu-toggle", {
                          "is-open": isMobileNavOpen,
                        })}
                        aria-expanded={isMobileNavOpen}
                        aria-controls="mobile-nav"
                        aria-label="Toggle Menu"
                      >
                        <span className="hamburger">
                          <span className="hamburger--icon"></span>
                        </span>
                      </button>
                      <m.div
                        initial="hide"
                        animate={isMobileNavOpen ? "show" : "hide"}
                        variants={{
                          show: {
                            x: "0%",
                          },
                          hide: {
                            x: "-100%",
                          },
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="menu-mobile"
                      >
                        <div className="menu-mobile--inner">
                          <div className="menu-mobile--primary">
                            {menuMobilePrimary?.items && (
                              <Menu
                                items={menuMobilePrimary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>

                          <div className="menu-mobile--secondary">
                            {menuMobileSecondary?.items && (
                              <Menu
                                items={menuMobileSecondary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>
                        </div>
                      </m.div>

                      <div
                        className={cx("menu-mobile--backdrop", {
                          "is-active": isMobileNavOpen,
                        })}
                        onClick={() => toggleMobileNav(false)}
                      />
                    </div>
                  </FocusTrap>

                  <CartToggle />
                </div>

                {/* Desktop Header Menu */}
                <div className="main-navigation--desktop">
                  <div className="menu-left">
                    {menuDesktopLeft?.items && (
                      <Menu
                        items={menuDesktopLeft.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>

                  <div className="menu-right">
                    {menuDesktopRight?.items && (
                      <Menu
                        items={menuDesktopRight.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                    <CartToggle />
                  </div>
                </div>
              </nav>
            </div>

            <div
              className={cx("header--border", {
                "is-hidden": meganav.isOpen,
              })}
            />
          </div>

          <MegaNavigation
            items={[
              ...(menuDesktopLeft?.items || []),
              ...(menuDesktopRight?.items || []),
            ]}
            headerHeight={
              isTransparent && observerIsVisible ? headerHeight : false
            }
          />
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </>
  );
};

const CartToggle = () => {
  const toggleCart = useToggleCart();
  const { totalItems, cartToggle } = useCartContext();

  return (
    <button className="cart-toggle" onClick={() => {
      cartToggle()
      console.log('toggling cart')
    }}>
      Cart
      <span
        className={cx("cart-toggle--count", {
          "is-active": totalItems > 0,
        })}
      >
        {totalItems ?? 0}
      </span>
    </button>
  );
};

const HeaderBackdrop = ({ isActive, onClick }) => {
  return (
    <div
      className={cx("header--backdrop", {
        "is-active": isActive,
      })}
      onClick={onClick}
    />
  );
};

export default Header;
