import { useState } from "react";
import styles from "./ExploreMore.module.css";

const CATEGORIES = [
  "All",
  "Popular",
  "Bread",
  "Croissant",
  "Muffin",
  "Cake",
  "Cheesecake",
  "Cupcake",
  "Tart",
];

const generateItems = (category, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    img1x: `/img/explore/${category}/explore-${category}-${i + 1}-1x.webp`,
    img2x: `/img/explore/${category}/explore-${category}-${i + 1}-2x.webp`,
    alt: `${category} ${i + 1}`,
    category,
  }));

const ALL_ITEMS = [
  ...generateItems("bread", 22),
  ...generateItems("croissant", 18),
  ...generateItems("muffin", 13),
  ...generateItems("cake", 8),
  ...generateItems("cheesecake", 10),
  ...generateItems("cupcake", 23),
  ...generateItems("tart", 15),
];

const FAVORITE_ITEMS = [
  ...generateItems("bread", 2),
  ...generateItems("croissant", 2),
  ...generateItems("muffin", 2),
  ...generateItems("cake", 2),
  ...generateItems("cheesecake", 2),
  ...generateItems("cupcake", 2),
  ...generateItems("tart", 2),
];

const ITEMS_PER_PAGE = 6;

function ExploreMore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const getFilteredItems = () => {
    if (activeCategory === "All") return ALL_ITEMS;
    if (activeCategory === "Popular") return FAVORITE_ITEMS;
    return ALL_ITEMS.filter(
      (item) => item.category === activeCategory.toLowerCase(),
    );
  };

  const filteredItems = getFilteredItems();
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className={styles.explore} id="explore">
      <div className="container">
        <h2 className={styles.title}>Explore More</h2>

        {/* SELECT — только мобилка */}
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* Кастомная стрелка */}
          <span className={styles.selectArrow}>▾</span>
        </div>

        {/* КНОПКИ — планшет и десктоп */}
        <div className={styles.filtersWrap}>
          <ul className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Счётчик */}
        <p className={styles.counter}>
          Showing {visibleItems.length} of {filteredItems.length}
        </p>

        {/* Сетка */}
        <ul className={styles.grid}>
          {visibleItems.map((item) => (
            <li key={item.id} className={styles.gridItem}>
              <img
                srcSet={`${item.img1x} 1x, ${item.img2x} 2x`}
                src={item.img1x}
                alt={item.alt}
                className={styles.img}
                loading="lazy"
              />
            </li>
          ))}
        </ul>

        {hasMore && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}

        {!hasMore && filteredItems.length > ITEMS_PER_PAGE && (
          <p className={styles.allLoaded}>All items loaded ✓</p>
        )}
      </div>
    </section>
  );
}

export default ExploreMore;
