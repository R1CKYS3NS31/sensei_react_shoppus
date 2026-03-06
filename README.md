# 🛍️ Shoppus Kenya - E-Commerce Platform

A **professional-grade e-commerce platform** built with React and Material-UI, specifically designed for the Kenya market.

## 🌟 Key Features

### Core Shopping
- ✅ Browse 8+ tech products with high-quality Unsplash images
- ✅ Advanced filtering (price range, ratings, categories)
- ✅ 6 sorting options (relevance, price, rating, newest, popularity)
- ✅ Real-time product search
- ✅ Quick view modal for fast product preview
- ✅ Detailed product pages with customer reviews

### Shopping & Checkout
- ✅ Shopping cart with persistence
- ✅ Wishlist/favorites with persistence
- ✅ 3-step checkout process (shipping → payment → review)
- ✅ Form validation with error handling
- ✅ 3 payment methods (M-Pesa, Card, Bank Transfer)
- ✅ Free shipping over KES 5,000

### User Management
- ✅ User authentication (login/signup)
- ✅ User profiles and account settings
- ✅ Order history tracking
- ✅ Profile editing
- ✅ User data persistence via localStorage

### Promotions & Marketing
- ✅ 5 coupon codes (SAVE10, SAVE20, FLAT500, WELCOME, REFER100)
- ✅ Discount calculation (percentage & fixed amounts)
- ✅ Newsletter signup integration
- ✅ Customer testimonials section
- ✅ Trending products showcase

### UX/Notifications
- ✅ Toast notifications for all actions
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Professional Material-UI styling

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# App opens at http://localhost:3000
```

## 🎯 Demo

**Login Credentials:**
- Email: `demo@example.com`
- Password: `demo123`

**Try These Coupon Codes:**
- SAVE10 (10% off)
- SAVE20 (20% off)
- FLAT500 (KES 500 off)
- WELCOME (15% off first-time)
- REFER100 (KES 100 off)

## 📖 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with features & testimonials |
| `/products` | Browse products with filters & sorting |
| `/product/:id` | Detailed product view |
| `/wishlist` | View favorited items |
| `/cart` | Shopping cart |
| `/checkout` | 3-step checkout process |
| `/order-confirmation` | Order success page |
| `/login` | Login/signup page |
| `/account` | User profile & order history |

## 🏗️ Technology

- React 18 + Create React App
- Material-UI v5 (all styling)
- React Router v6 (routing)
- React Context API (state management)
- localStorage (data persistence)
- Unsplash API (product images)
- Avataaars API (user avatars)

## 📚 Documentation

- [FEATURES.md](FEATURES.md) - Complete feature list with details
- [NAVIGATION_GUIDE.md](NAVIGATION_GUIDE.md) - How to use each page
- [DEVELOPER_DOCS.md](DEVELOPER_DOCS.md) - Technical implementation details
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview

## 📱 Browser Support

✅ Chrome, Firefox, Safari, Edge
✅ Mobile (iOS & Android)
✅ Fully responsive design

## 🌍 Kenya Localization

- 💵 Currency: Kenyan Shilling (KES)
- 📱 Payment: M-Pesa support
- 🚚 Shipping: Kenya-wide delivery
- 🏙️ Local references throughout UI

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
├── context/            # React Context providers (6 total)
├── pages/              # Page components (9 total)
├── utils/              # Utility functions
├── App.js              # Main app with routing
└── index.js            # React entry point
```

## ✨ Highlights

1. **Smart Filtering** - Price slider, rating dropdown, category filter
2. **Advanced Sorting** - 6 different sort options
3. **Discount System** - Real-time coupon application
4. **User Persistence** - Cart & wishlist saved locally
5. **Quick View** - Modal preview without navigation
6. **Order History** - Track past purchases
7. **Newsletter** - Email signup integration
8. **Testimonials** - Social proof with customer reviews

## 🎁 Try These Features

1. Login with demo credentials
2. Apply coupon code SAVE10 at checkout
3. Add items to wishlist
4. Use price slider to filter products
5. Sort by rating or price
6. Preview product with Quick View
7. View order history in account page

## 🔐 Note

This is a **demo/prototype** version. For production deployment:
- Implement real backend authentication
- Connect to actual payment gateway
- Add HTTPS/SSL encryption
- Implement proper security measures

## 🚀 Production Readiness

**Completed Features:**
- ✅ Complete product catalog with filtering
- ✅ Shopping cart with persistence
- ✅ User authentication flow
- ✅ Checkout process
- ✅ Coupon system
- ✅ Order management
- ✅ Wishlist functionality
- ✅ Newsletter integration
- ✅ Professional UI/UX
- ✅ Responsive design

**Status:** Beta Ready (v1.0.0)

---

For more information, see the documentation files included in the project.

**Built with ❤️ for Kenya e-commerce**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Hosted at [Shoppus](https://shoppus.netlify.app/)