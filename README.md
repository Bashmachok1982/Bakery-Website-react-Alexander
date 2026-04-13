# 🥐 Keithston Bakery

A modern, fully responsive bakery website built with React + Vite.
Crafted as a portfolio project to practice real-world frontend development.

## 🚀 Live Demo

[bakery-website-react-alexander.vercel.app](https://bakery-website-react-alexander.vercel.app)

![Keithston Bakery Preview](./public/preview.webp)

## 🛠️ Tech Stack

- **React 19** — component-based UI
- **Vite** — lightning fast build tool
- **CSS Modules** — scoped, conflict-free styles
- **Swiper** — touch slider
- **AOS** — scroll animations
- **react-hot-toast** — toast notifications
- **Telegram Bot API** — order & promo notifications (no backend!)
- **localStorage** — cart persistence across sessions

## 📦 Features

- 📱 Fully responsive — mobile / tablet / desktop (375px / 768px / 1440px)
- 🍔 Mobile menu with ripple effect and slide-in animation
- 🛒 Shopping cart — add/remove items, quantity control, persisted in localStorage
- 💳 Order form with contact details sent directly to Telegram
- 🎁 Promo code system with 20% discount validation
- 💬 Reminder to claim discount if ordering without promo code
- 🔄 Infinite scroll marquee for product rows (two directions)
- 🖼️ Explore gallery with category filters and Load More pagination
- 🌟 Popular picks section
- 📰 Recipe modal in footer with ingredients and step-by-step instructions
- 🎞️ Scroll animations via AOS
- ✨ Animated rotating border on navigation
- 🔔 Toast notifications
- 📬 Promo subscription form — email sent to Telegram bot
- 🏠 Fixed transparent header with blur on scroll

## 🏗️ Project Structure

src/
├── components/
│ ├── Header/
│ ├── MobileMenu/
│ ├── Hero/
│ ├── Products/
│ ├── Featured/
│ ├── AboutUs/
│ ├── Order/
│ ├── ExploreMore/
│ ├── Cart/
│ └── Footer/
├── data/
│ └── products.json
├── styles/
│ └── global.css
└── App.jsx

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Bashmachok1982/Bakery-Website-react-Alexander.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Variables

Create `.env` file in root:
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SUBSCRIBE_TEMPLATE_ID=your_subscribe_template_id

## 📚 What I Learned

- React hooks — `useState`, `useEffect`, `useRef`
- Lifting state up and props drilling
- Controlled forms with validation
- CSS Modules and responsive design
- Component architecture and separation of concerns
- localStorage for data persistence
- Telegram Bot API integration without backend
- IntersectionObserver for scroll-triggered animations
- CSS animations — rotating border, wiggle, ripple, marquee
- Lazy loading images for performance
- Adaptive images with `srcSet` for retina displays

---

Design inspired by [Bakery Website UI](https://www.figma.com/design/TH9n5z0pX18QSzqXimUQSm/Bakery-Website-Ui--Community-/)

Made with ❤️ and a lot of 🥐
