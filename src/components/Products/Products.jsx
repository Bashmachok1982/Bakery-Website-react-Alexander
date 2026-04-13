import { useState } from "react";
import products from "../../data/products.json";
import styles from "./Products.module.css";

const topRow = [...products, ...products];
const bottomRow = [...products, ...products];

function ProductCard({ product, onAddToCart, onInfo }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img
          srcSet={`${product.img1x} 1x, ${product.img2x} 2x`}
          src={product.img1x}
          alt={product.name}
          width="300"
          height="300"
        />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.cardPrice}>₴{product.price}</span>
          <button
            className={styles.cardInfo}
            onClick={() => onInfo(product)}
            aria-label="Product info"
          >
            <svg width="24" height="24">
              <use href="/img/icons.svg#icon-info" />
            </svg>
          </button>
        </div>

        <div className={styles.cardBottom}>
          <h3 className={styles.cardName}>{product.name}</h3>
          <button
            className={styles.cardAdd}
            onClick={() => onAddToCart(product)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function Products({ onAddToCart }) {
  const [infoProduct, setInfoProduct] = useState(null);

  return (
    <section className={styles.products} id="products">
      <div className="container">
        <h2 className={styles.title}>Top Products</h2>
      </div>

      <div className={styles.track}>
        <div className={`${styles.row} ${styles.rowLeft}`}>
          {topRow.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              onAddToCart={onAddToCart}
              onInfo={setInfoProduct}
            />
          ))}
        </div>

        <div className={`${styles.row} ${styles.rowRight}`}>
          {bottomRow.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              onAddToCart={onAddToCart}
              onInfo={setInfoProduct}
            />
          ))}
        </div>
      </div>

      {infoProduct && (
        <div
          className={styles.infoBackdrop}
          onClick={() => setInfoProduct(null)}
        >
          <div
            className={styles.infoModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.infoClose}
              onClick={() => setInfoProduct(null)}
            >
              ✕
            </button>
            <img
              srcSet={`${infoProduct.img1x} 1x, ${infoProduct.img2x} 2x`}
              src={infoProduct.img1x}
              alt={infoProduct.name}
              className={styles.infoImg}
            />
            <h3 className={styles.infoName}>{infoProduct.name}</h3>
            <p className={styles.infoPrice}>₴{infoProduct.price}</p>
            <p className={styles.infoDesc}>{infoProduct.description}</p>
            <button
              className={styles.infoBuy}
              onClick={() => {
                onAddToCart(infoProduct);
                setInfoProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
