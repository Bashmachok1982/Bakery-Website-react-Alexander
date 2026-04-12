import styles from "./AboutUs.module.css";

function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutInner}>
        <h2 className={styles.aboutTitle}>About us</h2>
        <p className={styles.aboutText}>
          Keithston Bakery was born from a simple passion — baking bread the way
          it used to be made. Every loaf, every pastry is crafted by hand using
          only natural ingredients sourced from local farms. No preservatives,
          no shortcuts. Just honest baking with love and tradition in every
          bite.
        </p>
        <a className={styles.aboutBtn} href="#order">
          Read More
        </a>
      </div>
    </section>
  );
}

export default About;
