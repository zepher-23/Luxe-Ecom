import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size = 'M', qty = 1) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id && x.size === size);

            if (existItem) {
                return prevItems.map((x) =>
                    x._id === product._id && x.size === size
                        ? { ...x, qty: x.qty + qty }
                        : x
                );
            } else {
                return [...prevItems, { ...product, size, qty }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id, size) => {
        setCartItems((prevItems) => prevItems.filter((x) => !(x._id === id && x.size === size)));
    };

    const updateQuantity = (id, size, qty) => {
        if (qty < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id && item.size === size ? { ...item, qty } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartCount = () => {
        return cartItems.reduce((acc, item) => acc + item.qty, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartCount,
                getCartTotal,
                isCartOpen,
                setIsCartOpen
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
