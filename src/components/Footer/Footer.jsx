import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#explore", label: "Blog" },
  { href: "#footer", label: "Contact us" },
  { href: "#products", label: "Services" },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", icon: "icon-facebook", label: "Facebook" },
  {
    href: "https://pinterest.com",
    icon: "icon-printerest",
    label: "Pinterest",
  },
  { href: "https://viber.com", icon: "icon-viber", label: "Viber" },
  { href: "https://instagram.com", icon: "icon-instagram", label: "Instagram" },
];

const NEWS = [
  {
    id: 1,
    img1x: "/img/footer/footer-recept-1-1x.webp",
    img2x: "/img/footer/footer-recept-1-2x.webp",
    date: "June 14, 2024",
    title: "Puff pastry bliss.",
    recipe: {
      ingredients: [
        "500g puff pastry dough",
        "200g fresh raspberries and blackberries",
        "150g vanilla cream cheese",
        "3 tbsp honey",
        "1 egg yolk for glazing",
        "2 tbsp powdered sugar",
      ],
      steps: [
        "Preheat oven to 200°C. Line a baking tray with parchment paper.",
        "Roll out the puff pastry on a floured surface to about 3mm thickness.",
        "Cut into equal rectangles or squares as desired.",
        "Spread a thin layer of vanilla cream cheese in the center of each piece.",
        "Top with fresh berries and drizzle with honey.",
        "Fold the edges slightly inward and brush with egg yolk.",
        "Bake for 18–22 minutes until golden and crispy.",
        "Dust with powdered sugar before serving. Best enjoyed warm!",
      ],
    },
  },
  {
    id: 2,
    img1x: "/img/footer/footer-recept-2-1x.webp",
    img2x: "/img/footer/footer-recept-2-2x.webp",
    date: "June 14, 2024",
    title: "Honey bread secrets.",
    recipe: {
      ingredients: [
        "400g bread flour",
        "7g dry yeast",
        "250ml warm water",
        "3 tbsp natural honey",
        "2 tbsp olive oil",
        "1 tsp salt",
        "1 tbsp sesame seeds for topping",
      ],
      steps: [
        "Dissolve yeast in warm water with 1 tbsp honey. Let stand for 10 minutes until foamy.",
        "Mix flour and salt in a large bowl. Make a well in the center.",
        "Pour in the yeast mixture, remaining honey and olive oil.",
        "Knead the dough for 10 minutes until smooth and elastic.",
        "Cover with a towel and let rise in a warm place for 1 hour.",
        "Shape the dough into a round loaf and place on a baking tray.",
        "Brush with water and sprinkle sesame seeds on top.",
        "Bake at 190°C for 30–35 minutes until deep golden brown.",
        "Tap the bottom — it should sound hollow when done. Cool before slicing.",
      ],
    },
  },
];

function Footer() {
  const [activeRecipe, setActiveRecipe] = useState(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveRecipe(null);
    };
    if (activeRecipe) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeRecipe]);

  // Блокировка скролла
  useEffect(() => {
    document.body.style.overflow = activeRecipe ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeRecipe]);

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        {/* Верхняя часть */}
        <div className={styles.footerTop}>
          <a href="/">
            <img
              src="/img/footer-logo.webp"
              alt="Keithston logo"
              className={styles.logo}
              width={120}
              height={60}
            />
          </a>
          <div className={styles.social}>
            <span className={styles.socialLabel}>Follow us</span>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="32" height="32">
                      <use href={`/img/icons.svg#${social.icon}`} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Три колонки */}
        <div className={styles.footerBottom}>
          <div className={styles.col}>
            <h3 className={styles.colTitle}>About Us</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>(456) 789-12301</li>
              <li className={styles.contactItem}>info@keithston.co.uk</li>
              <li className={styles.contactItem}>South 13th street</li>
              <li className={styles.contactItem}>Kyiv, Ukraine</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Explore</h3>
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Recent News</h3>
            <ul className={styles.newsList}>
              {NEWS.map((item) => (
                <li
                  key={item.id}
                  className={styles.newsItem}
                  onClick={() => setActiveRecipe(item)}
                >
                  <img
                    srcSet={`${item.img1x} 1x, ${item.img2x} 2x`}
                    src={item.img1x}
                    alt={item.title}
                    className={styles.newsImg}
                    width={80}
                    height={60}
                  />
                  <div className={styles.newsContent}>
                    <span className={styles.newsDate}>{item.date}</span>
                    <p className={styles.newsTitle}>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} Keithston Bake House. All rights
            reserved
          </p>
        </div>
      </div>

      {activeRecipe && (
        <div className={styles.backdrop} onClick={() => setActiveRecipe(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setActiveRecipe(null)}
            >
              ✕
            </button>

            <img
              srcSet={`${activeRecipe.img1x} 1x, ${activeRecipe.img2x} 2x`}
              src={activeRecipe.img1x}
              alt={activeRecipe.title}
              className={styles.modalImg}
            />

            <h3 className={styles.modalTitle}>{activeRecipe.title}</h3>
            <span className={styles.modalDate}>{activeRecipe.date}</span>

            <div className={styles.recipeSection}>
              <h4 className={styles.recipeSubtitle}>Ingredients</h4>
              <ul className={styles.ingredientsList}>
                {activeRecipe.recipe.ingredients.map((ing, i) => (
                  <li key={i} className={styles.ingredientItem}>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.recipeSection}>
              <h4 className={styles.recipeSubtitle}>Instructions</h4>
              <ol className={styles.stepsList}>
                {activeRecipe.recipe.steps.map((step, i) => (
                  <li key={i} className={styles.stepItem}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
