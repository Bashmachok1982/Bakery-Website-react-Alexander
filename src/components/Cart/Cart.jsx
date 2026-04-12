import { useState } from "react";
import styles from "./Cart.module.css";

function Cart({
  isOpen,
  onClose,
  items,
  onAddOne,
  onRemoveOne,
  onRemoveItem,
  onClearCart,
}) {
  const [orderStatus, setOrderStatus] = useState("idle");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrder = async () => {
    if (items.length === 0) return;
    setOrderStatus("sending");

    const itemsList = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ₴${item.price * item.quantity}`,
      )
      .join("\n");

    const message = `
🛒 Новый заказ!
${itemsList}
💰 Итого: ₴${total}
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
      if (!res.ok) throw new Error();
      setOrderStatus("success");
      onClearCart();
      setTimeout(() => {
        setOrderStatus("idle");
        onClose();
      }, 2500);
    } catch {
      setOrderStatus("error");
      setTimeout(() => setOrderStatus("idle"), 3000);
    }
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.cart} ${isOpen ? styles.cartOpen : ""}`}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Your cart is empty 🛒</p>
            <button className={styles.continueBtn} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.itemsList}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img
                    src={item.img1x}
                    alt={item.name}
                    className={styles.itemImg}
                    width={70}
                    height={70}
                  />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>₴{item.price}</p>
                    <div className={styles.itemControls}>
                      <button
                        className={styles.controlBtn}
                        onClick={() => onRemoveOne(item.id)}
                      >
                        −
                      </button>
                      <span className={styles.itemQty}>{item.quantity}</span>
                      <button
                        className={styles.controlBtn}
                        onClick={() => onAddOne(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemRight}>
                    <p className={styles.itemTotal}>
                      ₴{item.price * item.quantity}
                    </p>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total:</span>
                <span className={styles.totalPrice}>₴{total}</span>
              </div>

              {orderStatus === "success" ? (
                <p className={styles.successMsg}>
                  ✅ Order sent! We'll contact you soon.
                </p>
              ) : (
                <>
                  <button
                    className={styles.orderBtn}
                    onClick={handleOrder}
                    disabled={orderStatus === "sending"}
                  >
                    {orderStatus === "sending"
                      ? "Sending..."
                      : "Order via Telegram"}
                  </button>
                  {orderStatus === "error" && (
                    <p className={styles.errorMsg}>
                      ❌ Something went wrong. Try again.
                    </p>
                  )}
                  <button className={styles.clearBtn} onClick={onClearCart}>
                    Clear cart
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
