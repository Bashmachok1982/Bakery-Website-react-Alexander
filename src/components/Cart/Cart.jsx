import { useState } from "react";
import styles from "./Cart.module.css";

const PROMO_CODE = "SWEET20";
const DISCOUNT = 0.2;

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
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = promoApplied ? Math.round(subtotal * DISCOUNT) : 0;
  const total = subtotal - discount;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone))
      errors.phone = "Invalid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Invalid email";
    return errors;
  };

  const handleOrder = async () => {
    if (items.length === 0) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setOrderStatus("sending");

    const itemsList = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ₴${item.price * item.quantity}`,
      )
      .join("\n");

    const message = `
🛒 Новый заказ!
👤 Имя: ${form.name}
📱 Телефон: ${form.phone}
${form.email ? `📧 Email: ${form.email}` : ""}
${promoApplied ? `🎁 Промокод: ${PROMO_CODE} (-20%)` : ""}

${itemsList}

💰 Сумма: ₴${subtotal}
${promoApplied ? `🎉 Скидка: -₴${discount}` : ""}
✅ Итого: ₴${total}
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
      setForm({ name: "", phone: "", email: "" });
      setPromoInput("");
      setPromoApplied(false);
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
          <div className={styles.cartBody}>
            {/* Список товаров */}
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

            {/* Промокод */}
            <div className={styles.promoSection}>
              <p className={styles.promoLabel}>Promo code</p>
              <div className={styles.promoRow}>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoError("");
                    if (promoApplied) setPromoApplied(false);
                  }}
                  className={`${styles.promoInput} ${promoApplied ? styles.promoSuccess : ""}`}
                />
                <button
                  className={styles.promoBtn}
                  onClick={handleApplyPromo}
                  disabled={!promoInput.trim()}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className={styles.promoOk}>✅ -20% applied!</p>
              )}
              {promoError && <p className={styles.promoErr}>{promoError}</p>}

              {/* Напоминалка если нет промокода */}
              {!promoApplied && (
                <p className={styles.promoHint}>
                  💡 Don't have a code?{" "}
                  <a
                    href="#order"
                    onClick={onClose}
                    className={styles.promoLink}
                  >
                    Get 20% off →
                  </a>
                </p>
              )}
            </div>

            {/* Форма контактов */}
            <div className={styles.formSection}>
              <p className={styles.formTitle}>Your contacts</p>

              <div className={styles.formField}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name *"
                  value={form.name}
                  onChange={handleFormChange}
                  className={`${styles.formInput} ${formErrors.name ? styles.inputError : ""}`}
                />
                {formErrors.name && (
                  <p className={styles.fieldError}>{formErrors.name}</p>
                )}
              </div>

              <div className={styles.formField}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number * (+380...)"
                  value={form.phone}
                  onChange={handleFormChange}
                  className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ""}`}
                />
                {formErrors.phone && (
                  <p className={styles.fieldError}>{formErrors.phone}</p>
                )}
              </div>

              <div className={styles.formField}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={handleFormChange}
                  className={`${styles.formInput} ${formErrors.email ? styles.inputError : ""}`}
                />
                {formErrors.email && (
                  <p className={styles.fieldError}>{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Итог */}
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Subtotal:</span>
                <span>₴{subtotal}</span>
              </div>
              {promoApplied && (
                <div className={`${styles.totalRow} ${styles.discountRow}`}>
                  <span>Discount (20%):</span>
                  <span>-₴{discount}</span>
                </div>
              )}
              <div className={`${styles.totalRow} ${styles.totalFinal}`}>
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
                    {orderStatus === "sending" ? "Sending..." : "Place Order"}
                  </button>
                  {orderStatus === "error" && (
                    <p className={styles.errorMsg}>❌ Something went wrong.</p>
                  )}
                  <button className={styles.clearBtn} onClick={onClearCart}>
                    Clear cart
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
