import React, { createContext, useState, useCallback } from 'react';

export const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Sample coupons database
  const validCoupons = {
    'SAVE10': { code: 'SAVE10', discount: 0.10, type: 'percentage', name: '10% Off Order' },
    'SAVE20': { code: 'SAVE20', discount: 0.20, type: 'percentage', name: '20% Off Order' },
    'FLAT500': { code: 'FLAT500', discount: 500, type: 'fixed', name: 'KES 500 Off' },
    'WELCOME': { code: 'WELCOME', discount: 0.15, type: 'percentage', name: '15% First-Time Buyer' },
    'REFER100': { code: 'REFER100', discount: 100, type: 'fixed', name: 'KES 100 Referral Bonus' },
  };

  const applyCoupon = useCallback((code, subtotal) => {
    const trimmedCode = code.trim().toUpperCase();
    
    if (!trimmedCode) {
      setErrorMessage('Please enter a coupon code');
      return { success: false, message: 'Please enter a coupon code' };
    }

    const coupon = validCoupons[trimmedCode];
    
    if (!coupon) {
      setErrorMessage('Invalid coupon code');
      return { success: false, message: 'Invalid coupon code' };
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = Math.round(subtotal * coupon.discount);
    } else {
      discount = coupon.discount;
    }

    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, subtotal);

    setAppliedCoupon(coupon);
    setDiscountAmount(discount);
    setErrorMessage('');
    
    return { 
      success: true, 
      message: `Coupon "${coupon.code}" applied! You save KES ${discount}`,
      discount 
    };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setErrorMessage('');
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  return (
    <DiscountContext.Provider
      value={{
        appliedCoupon,
        discountAmount,
        errorMessage,
        applyCoupon,
        removeCoupon,
        clearError,
        availableCoupons: Object.values(validCoupons)
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
