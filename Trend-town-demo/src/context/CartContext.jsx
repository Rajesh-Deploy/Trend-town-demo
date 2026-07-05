import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load initial cart state from localStorage if available (helps for a realistic demo feel!)
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('trend_town_cart');
    return localData ? JSON.parse(localData) : [];
  });

  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trend_town_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product, size) => {
    if (!size) {
      addToast('Please select a size first!', 'error');
      return false;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { ...product, size, quantity: 1 }];
      }
    });

    addToast(`Added ${product.name} (Size: ${size}) to cart!`, 'success');
    return true;
  };

  const removeFromCart = (productId, size) => {
    const item = cartItems.find((i) => i.id === productId && i.size === size);
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.size === size))
    );
    if (item) {
      addToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('trend_town_cart');
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        toasts,
        addToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
