import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#explore", label: "Blog" },
  { href: "#footer", label: "Contact Us" },
  { href: "#products", label: "Services" },
];

function Header({ cartCount, onCartOpen, onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={`container ${styles.headerContainer}`}>
        <nav className={styles.headerNavigation}>
          <a href="/">
            <img
              src="/img/header-logo.webp"
              alt="Bakery logo"
              width={87}
              height={99}
            />
          </a>

          <ul className={styles.headerMenuList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerRight}>
          <div
            className={styles.cart}
            onClick={onCartOpen}
            style={{ cursor: "pointer" }}
          >
            <svg width="28" height="28">
              <use href="/img/icons.svg#icon-cart" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>

          <button
            type="button"
            className={styles.menuOpenBtn}
            onClick={onMenuOpen}
            aria-label="Відкрити меню"
          >
            <svg width="64" height="64">
              <use href="/img/icons.svg#icon-burger-menu2" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
