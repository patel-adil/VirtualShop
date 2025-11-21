import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const MarketplaceContext = createContext();

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
};

export const MarketplaceProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Load cart and orders from localStorage for this user
      if (currentUser) {
        const savedCart = localStorage.getItem(`cart_${currentUser.uid}`);
        const savedOrders = localStorage.getItem(`orders_${currentUser.uid}`);
        
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } else {
        setCart([]);
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      
      // Provide specific error messages
      let errorMessage = 'Failed to sign in with Google. ';
      
      switch (error.code) {
        case 'auth/operation-not-allowed':
          errorMessage += 'Google sign-in is not enabled. Please enable it in Firebase Console.';
          break;
        case 'auth/popup-blocked':
          errorMessage += 'Popup was blocked by your browser. Please allow popups for this site.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage += 'Sign-in popup was closed before completion.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage += 'This domain is not authorized. Please add it in Firebase Console.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage += 'Another popup is already open.';
          break;
        default:
          errorMessage += `Error: ${error.message}`;
      }
      
      alert(errorMessage);
      
      // Log detailed error for debugging
      console.log('Firebase Auth Error Code:', error.code);
      console.log('Firebase Auth Error Message:', error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCart([]);
      setOrders([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (shippingInfo) => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return false;
    }

    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      shippingInfo,
      date: new Date().toISOString(),
      status: 'Processing'
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return true;
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    user,
    cart,
    orders,
    loading,
    signInWithGoogle,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    getCartTotal,
    getCartItemCount
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

