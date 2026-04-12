import styles from "./Featured.module.css";

const FEATURED = [
  {
    id: 1,
    name: "Puff Pastry",
    price: 85,
    img1x: "/img/feature/feature-1-1x.webp",
    img2x: "/img/feature/feature-1-2x.webp",
  },
  {
    id: 2,
    name: "Doughnuts",
    price: 65,
    img1x: "/img/feature/feature-2-1x.webp",
    img2x: "/img/feature/feature-2-2x.webp",
  },
  {
    id: 3,
    name: "Brownies",
    price: 95,
    img1x: "/img/feature/feature-3-1x.webp",
    img2x: "/img/feature/feature-3-2x.webp",
  },
];

function Featured({ onAddToCart }) {
  return (
    <section className={styles.featured} id="featured">
      <div className="container">
        <h2 className={styles.title}>Featured Treats</h2>

        <ul className={styles.list}>
          {FEATURED.map((item, index) => (
            <li
              key={item.id}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className={styles.imgWrap}>
                <img
                  srcSet={`${item.img1x} 1x, ${item.img2x} 2x`}
                  src={item.img1x}
                  alt={item.name}
                  className={styles.img}
                />
                {/* Overlay при hover */}
                <div className={styles.overlay}>
                  <button
                    className={styles.overlayBtn}
                    onClick={() => onAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className={styles.cardBottom}>
                <h3 className={styles.name}>{item.name}</h3>
                <span className={styles.price}>₴{item.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Featured;
