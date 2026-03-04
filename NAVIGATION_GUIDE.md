# 🎯 ShopHub Kenya - Quick Navigation Guide

## Routes & What You'll Find

### 🏠 **Home** (`/`)
- Hero section with call-to-action
- "Why Choose ShopHub" features
- Trending products (top 4)
- Customer testimonials & stats
- Newsletter signup section

### 🛍️ **Products** (`/products`)
- Browse all products in grid
- **Filter by:**
  - Price range (slider)
  - Rating (dropdown)
  - Category (dropdown)
  - Search by name
- **Sort by:**
  - Relevance
  - Price: Low to High
  - Price: High to Low
  - Rating
  - Newest
  - Most Popular

### 📦 **Product Detail** (`/product/:id`)
- Full product image
- Detailed description
- Specifications (as chips)
- Customer reviews
- Rating and review count
- Add to cart button
- Related products section

### ❤️ **Wishlist** (`/wishlist`)
- View all favorited products
- See wishlist count
- Remove items individually
- Clear entire wishlist
- Browse wishlist products

### 🛒 **Shopping Cart** (`/cart`)
- List all items in cart
- Adjust quantities
- Remove items
- View subtotal and total
- "Proceed to Checkout" button
- Free shipping notification

### 💳 **Checkout** (`/checkout`)
**Step 1: Shipping**
- First name, last name
- Email, phone
- Address, city, postal code
- Form validation

**Step 2: Payment**
- M-Pesa
- Credit/Debit Card
- Bank Transfer
- Payment tips

**Step 3: Review**
- Review shipping info
- Review order items
- Review total with discount
- **Apply Coupon Code:**
  - Try: SAVE10, SAVE20, FLAT500, WELCOME, REFER100
  - Remove coupon if needed
- Place order button

### ✅ **Order Confirmation** (`/order-confirmation`)
- Order success message
- Order number and date
- Estimated delivery
- Total price
- What's next steps
- Contact information

### 🔐 **Login** (`/login`)
**Login Tab**
- Email input
- Password input
- Login button
- Link to signup

**Signup Tab**
- Full name input
- Email input
- Password input
- Confirm password
- Create account button
- Link to login

### 👤 **Account** (`/account`)
- User profile with avatar
- Name and email display
- Join date
- Edit profile dialog
- **Tabs:**
  - Order History (table with ID, date, total, status)
  - Account Settings (email, status)
- Logout button

---

## Header Navigation

- **Logo** → Home
- **Search bar** → Search products
- **Cart icon** (with badge) → Cart page
- **Wishlist heart** (with badge) → Wishlist page
- **User logged in?**
  - Avatar menu → My Account or Logout
  - Showing: name, email in menu
- **User not logged in?**
  - Login button → Login page

---

## Quick Actions Available

### On Any Product Card
- **Click card** → Go to product detail
- **Add to Cart** → Add product, show notification
- **Heart icon** → Toggle wishlist, show notification
- **Quick View** → Open modal preview

### In Cart
- Change quantity with input
- Remove item individually
- Proceed to checkout

### In Checkout
- Navigate between steps
- Apply coupon code
- Edit shipping info
- Choose payment method

### In Account
- Edit profile (name)
- View order history
- See order status
- Logout

---

## Sample Data

### 8 Products Available
1. Wireless Earbuds Pro - KES 8,999
2. Smart Watch Ultra - KES 15,499
3. USB-C Fast Charging Cable - KES 1,299
4. Phone Case Premium - KES 2,499
5. Bluetooth Speaker - KES 4,999
6. Tempered Glass Screen Protector - KES 799
7. Wireless Charging Pad - KES 3,299
8. Professional Camera Filter - KES 6,999

### Sample Coupon Codes
- **SAVE10** (10% off)
- **SAVE20** (20% off)
- **FLAT500** (KES 500 off)
- **WELCOME** (15% first-time buyer)
- **REFER100** (KES 100 referral)

### Demo Account
- **Email:** demo@example.com
- **Password:** demo123

---

## Key Features At A Glance

| Feature | Location | Status |
|---------|----------|--------|
| Product Browsing | /products | ✅ |
| Advanced Filters | /products | ✅ |
| Product Search | Header | ✅ |
| Quick View Modal | ProductCard | ✅ |
| Shopping Cart | /cart | ✅ |
| Wishlist | /wishlist | ✅ |
| Checkout Process | /checkout | ✅ |
| Coupon Codes | /checkout | ✅ |
| User Authentication | /login | ✅ |
| Account Management | /account | ✅ |
| Order History | /account | ✅ |
| Notifications | Toast display | ✅ |
| Newsletter | Home page | ✅ |
| Testimonials | Home page | ✅ |

---

## Helpful Tips

💡 **Price Filtering:** Use the slider to set minimum and maximum price
💡 **Sorting:** Choose "Relevance" to sort by search match
💡 **Coupons:** Test codes in checkout - each works on the full order amount
💡 **Wishlist:** Favorited items are saved even after closing browser
💡 **Cart:** Same - your items stay in cart when you come back
💡 **Account:** Login to see order history and manage profile

---

## Browser Support

✅ Chrome, Firefox, Safari, Edge
✅ Mobile (iOS & Android)
✅ Tablet
✅ Desktop

Responsive design adapts to all screen sizes automatically.

---

**Questions?** Check the features list in each page or try the demo account!
