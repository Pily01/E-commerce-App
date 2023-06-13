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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    total: 0,
    setTotal: () => {}
})

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ total, setTotal ] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    useEffect(() => {
        const newTotal = cartItems.reduce((currTotal, cartItem)=> currTotal + cartItem.quantity , 0);
        setTotal(newTotal);
    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, total}

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}