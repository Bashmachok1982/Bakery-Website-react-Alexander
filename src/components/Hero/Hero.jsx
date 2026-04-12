import styles from "./Hero.module.css";

function Hero({ onCartOpen }) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Delicious Cafe</p>
          <h1 className={styles.heroTitle}>Sweet Treats, Perfect Eats</h1>
          <div className={styles.heroButtons}>
            {/* Shop Now — открывает корзину */}
            <button
              className={styles.heroBtnBuy}
              type="button"
              onClick={onCartOpen}
            >
              Shop Now
            </button>

            {/* Learn More — скроллит к продуктам */}
            <a className={styles.heroBtn} href="#products">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
