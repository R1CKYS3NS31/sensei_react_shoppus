# ShopHub Kenya - Developer Documentation

## 🏗️ Architecture Overview

### State Management Hierarchy

```
App.js
├── ProductProvider (ProductContext)
│   └── Cart, Products, ProductDetail pages access product data
├── CartProvider (CartContext)
│   └── Cart, Header, ProductCard, Checkout pages access cart
├── WishlistProvider (WishlistContext)
│   └── Wishlist, Header, ProductCard pages access wishlist
├── UserProvider (UserContext)
│   └── Login, Account, Checkout, Header pages access user auth
├── DiscountProvider (DiscountContext)
│   └── Checkout page applies coupons
└── NotificationProvider (NotificationContext)
    └── All pages can trigger notifications
```

### Data Flow

**Product Browsing:**
```
ProductContext (8 products with full data)
  ↓
Products page (search, filter, sort)
  ↓
ProductCard (display in grid)
  ↓
ProductDetail page (show full info)
```

**Shopping:**
```
ProductCard
  ↓
AddToCart action
  ↓
CartContext (localStorage)
  ↓
Cart page / Header badge
```

**Checkout:**
```
CartContext → Checkout
  ↓
DiscountContext (apply coupon)
  ↓
UserContext (create order)
  ↓
OrderConfirmation page
```

---

## 🔧 Context API Details

### ProductContext
**State:**
```javascript
{
  products: Array<Product>,
  searchQuery: string,
  selectedCategory: string,
  loading: boolean,
  error: null
}
```

**Methods:**
```javascript
getProductById(id) → Product
getRelatedProducts(id, limit) → Array<Product>
searchProducts(query) → Array<Product>
getProductsByCategory(category) → Array<Product>
getCategories() → Array<string>
```

### CartContext
**State:**
```javascript
{
  cartItems: Array<CartItem>, // {id, name, price, quantity, image}
  totalItems: number,
  totalPrice: number
}
```

**Methods:**
```javascript
addToCart(product) → void
removeFromCart(productId) → void
updateQuantity(productId, quantity) → void
clearCart() → void
getTotalPrice() → number
getTotalItems() → number
```

**Persistence:** localStorage key 'cart'

### WishlistContext
**State:**
```javascript
{
  wishlistItems: Array<Product>
}
```

**Methods:**
```javascript
addToWishlist(product) → void
removeFromWishlist(productId) → void
toggleWishlist(product) → void
isInWishlist(productId) → boolean
getWishlistCount() → number
clearWishlist() → void
```

**Persistence:** localStorage key 'wishlist'

### UserContext
**State:**
```javascript
{
  user: {
    id: string,
    email: string,
    name: string,
    avatar: string,
    joinDate: Date
  },
  isAuthenticated: boolean,
  orderHistory: Array<Order>
}
```

**Methods:**
```javascript
login(email, password) → {success, message}
signup(email, password, name) → {success, message}
logout() → void
addOrder(orderData) → void
updateProfile(updates) → void
```

**Persistence:** localStorage key 'user'

### DiscountContext
**State:**
```javascript
{
  appliedCoupon: Coupon | null,
  discountAmount: number,
  errorMessage: string,
  availableCoupons: Array<Coupon>
}
```

**Methods:**
```javascript
applyCoupon(code, subtotal) → {success, discount, message}
removeCoupon() → void
clearError() → void
```

**Valid Coupons:**
```javascript
{
  'SAVE10': { discount: 0.10, type: 'percentage' },
  'SAVE20': { discount: 0.20, type: 'percentage' },
  'FLAT500': { discount: 500, type: 'fixed' },
  'WELCOME': { discount: 0.15, type: 'percentage' },
  'REFER100': { discount: 100, type: 'fixed' }
}
```

### NotificationContext
**State:**
```javascript
{
  notifications: Array<{id, message, type, duration}>
}
```

**Methods:**
```javascript
showNotification(message, type) → void
// type: 'success' | 'error' | 'warning' | 'info'
```

---

## 📝 Component Documentation

### ProductCard Props
```javascript
<ProductCard 
  product={{
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    stock: number,
    rating: number,
    reviews_count: number,
    specs: Array<string>
  }}
/>
```

### QuickViewModal Props
```javascript
<QuickViewModal 
  open={boolean}
  product={Product}
  onClose={() => {}}
/>
```

### TestimonialsSection
- No props required
- Displays 4 hardcoded testimonials
- Shows stats section

---

## 🔄 Common Workflows

### Add Product to Cart
```javascript
const { addToCart } = useContext(CartContext);

const handleAddCart = (product) => {
  addToCart(product); // Automatically persists to localStorage
  showNotification('Added to cart', 'success');
};
```

### Apply Coupon
```javascript
const { applyCoupon, discountAmount } = useContext(DiscountContext);

const handleApply = (code, subtotal) => {
  const result = applyCoupon(code, subtotal);
  if (result.success) {
    showNotification(result.message, 'success');
  }
};
```

### Filter Products
```javascript
const { products, searchProducts, getProductsByCategory } = useContext(ProductContext);

const filtered = products.filter(p => 
  p.name.toLowerCase().includes(search.toLowerCase()) &&
  p.category === selectedCategory &&
  p.price >= priceRange[0] && p.price <= priceRange[1] &&
  p.rating >= minRating
);
```

### User Login
```javascript
const { login } = useContext(UserContext);

const handleLogin = async (email, password) => {
  const result = login(email, password);
  if (result.success) {
    navigate('/');
  }
};
```

---

## 📦 API Integration Points

### Currently Using External APIs:
1. **Unsplash** - Product images
   - Format: `https://images.unsplash.com/photo-{id}?w=400&h=400&fit=crop`

2. **Avataaars** - User avatars
   - Format: `https://api.avataaars.io/?avatarStyle=Circle&...`

### For Production Deployment:
- Replace Unsplash with own image hosting
- Replace Avataaars with user profile pictures
- Implement real backend authentication
- Add real payment processing (M-Pesa API)
- Connect to real inventory management

---

## 🧪 Testing Checklist

- [ ] All routes load without errors
- [ ] Product filters work correctly
- [ ] Sorting produces expected order
- [ ] Cart items persist across page reload
- [ ] Wishlist items persist across page reload
- [ ] Coupon codes apply correctly
- [ ] Discount calculation is accurate
- [ ] Form validation works
- [ ] Notifications display properly
- [ ] Quick view modal opens/closes
- [ ] Login/signup creates user
- [ ] Account page shows order history
- [ ] Header menu reflects auth state

---

## 🚀 Deployment Considerations

### Production Checklist:
- [ ] Replace demo coupon codes with real ones
- [ ] Implement real authentication (JWT + backend)
- [ ] Add real payment gateway (Daraja API for M-Pesa)
- [ ] Set up HTTPS/SSL
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Add analytics tracking
- [ ] Set up error logging
- [ ] Optimize images
- [ ] Configure CDN
- [ ] Add security headers
- [ ] Set up database (MongoDB/PostgreSQL)

---

## 📊 Performance Optimization

**Current:**
- useMemo for filtered products (avoids re-renders)
- Lazy-loaded product images
- Responsive images from Unsplash
- Debounced search
- localStorage caching

**Future Improvements:**
- Server-side caching
- Image CDN optimization
- Code splitting by route
- Virtual scrolling for large product lists
- Service Worker for offline support

---

## 🔐 Security Notes

**Current (Demo):**
- Passwords stored in localStorage (insecure)
- No backend validation
- CORS requests to external APIs
- No HTTPS enforcement

**For Production:**
- Hash passwords with bcrypt
- Use JWT tokens
- Implement backend validation
- Add HTTPS only
- Use secure cookies (HttpOnly, Secure flags)
- Implement CSRF tokens
- Add rate limiting
- Validate all user inputs
- Use environment variables for secrets

---

## 🐛 Known Limitations

1. Authentication is simulated (no real backend)
2. Payments are not processed
3. Orders don't actually go to a database
4. Email notifications are not sent
5. No real inventory tracking
6. No admin dashboard
7. Limited to 8 hardcoded products
8. No user profile picture upload

---

## 📚 File Size Reference

Total src/ folder: ~150KB
- contexts/ ~35KB
- pages/ ~80KB
- components/ ~25KB
- utils/ ~2KB

Gzip compressed: ~35KB (production)

---

## 🔗 Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "@mui/material": "^5.0.0",
  "@mui/icons-material": "^5.0.0"
}
```

No additional npm packages needed for features implemented.

---

## 📞 Support & Maintenance

For issues or feature requests:
1. Check FEATURES.md for available functionality
2. Review component props documentation above
3. Check context API usage patterns
4. Verify localStorage is not full
5. Test with demo credentials

---

**Last Updated:** After implementing Quick View & Testimonials
**Maintained By:** ShopHub Development Team
**Version:** 1.0.0 Beta
