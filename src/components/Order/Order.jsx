import { useState, useEffect, useRef } from "react";
import styles from "./Order.module.css";

const PROMO_CODE = "SWEET20";

function Order() {
  // Счётчик 0 → 20
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Модалка
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

 
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 20) clearInterval(interval);
    }, 60); // каждые 60мс +1 → итого 1.2 секунды
    return () => clearInterval(interval);
  }, [isVisible]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isModalOpen]);

 
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    const message = `
🎉 Новый запрос на скидку!
📧 Email: ${email}
🎁 Промокод: ${PROMO_CODE}
🕐 Время: ${new Date().toLocaleString("uk-UA")}
    `.trim();

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
            text: message,
          }),
        },
      );

      if (!res.ok) throw new Error("Telegram error");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.order} ref={sectionRef} id="order">
      <div className={styles.orderInner}>
        <div className={styles.orderContent}>
          {/* Счётчик */}
          <h2 className={styles.orderTitle}>
            <span className={styles.orderCount}>{count}%</span> Off Your <br />
            First Order
          </h2>

          <p className={styles.orderText}>
            Use code <strong>{PROMO_CODE}</strong> at checkout and enjoy a
            special discount on your first bakery order. Fresh bread, pastries
            and more — delivered to your door.
          </p>

          <button
            className={styles.orderBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Claim 20% Off
          </button>
        </div>
      </div>

  
      {isModalOpen && (
        <div
          className={styles.backdrop}
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h3 className={styles.modalTitle}>Your Promo Code</h3>

            <div className={styles.promoWrap}>
              <span className={styles.promoCode}>{PROMO_CODE}</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>

            <p className={styles.modalText}>
              Enter your email and we'll send the code directly to your inbox!
            </p>

            {status === "success" ? (
              <p className={styles.successMsg}>
                ✅ Done! Check your email soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.modalInput}
                  required
                />
                <button
                  type="submit"
                  className={styles.modalBtn}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Me the Code"}
                </button>
                {status === "error" && (
                  <p className={styles.errorMsg}>
                    ❌ Something went wrong. Try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Order;
