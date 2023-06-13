import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            :
            cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    if(productToRemove.quantity === 1){
        const result = cartItems.filter(item => item.id !== productToRemove.id)
        return result
    }else{
        return cartItems.map((item) => 
            item.id === productToRemove.id ?
            {...item, quantity: productToRemove.quantity - 1}
            :
            item
        )
    }
}

const clearCartItem = (cartItems, productToClear) => {
    const result = cartItems.filter(item => item.id !== productToClear.id)
    return result
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    total: 0,
    totalValue: 0,
})

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ totalValue, setTotalValue] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    useEffect(() => {
        const newTotal = cartItems.reduce((currTotal, cartItem)=> currTotal + cartItem.quantity , 0);
        setTotal(newTotal);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((currTotal, cartItem)=> currTotal + (cartItem.quantity * cartItem.price), 0);
        setTotalValue(newTotal);
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, total, totalValue}

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}