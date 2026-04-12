import styles from "./MobileMenu.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#made", label: "Blog" },
  { href: "#footer", label: "Contact Us" },
  { href: "#", label: "Services" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", icon: "icon-insta", label: "Instagram" },
  { href: "https://twitter.com", icon: "icon-twit", label: "Twitter" },
];

const handleRipple = (e, onClose) => {
  const link = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = link.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  ripple.className = styles.ripple;

  link.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
  setTimeout(() => onClose(), 400);
};

function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`${styles.mobMenu} ${isOpen ? styles.mobMenuOpen : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={styles.menuCloseBtn}
        onClick={onClose}
        aria-label="Закрити меню"
      >
        ✕
      </button>

      <nav className={styles.mobNavigation}>
        <ul className={styles.mobMenuList}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className={styles.mobMenuItem}>
              <a
                className={styles.mobMenuLink}
                href={link.href}
                onClick={(e) => handleRipple(e, onClose)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <address className={styles.mobContacts}>
        <ul className={styles.mobContactsList}>
          {SOCIAL_LINKS.map((social) => (
            <li key={social.href} className={styles.mobContactsItem}>
              <a
                className={styles.mobContactsLink}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className={styles.mobContactsIcon} width="24" height="24">
                  <use href={`/img/icons.svg#${social.icon}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </address>
    </div>
  );
}

export default MobileMenu;
