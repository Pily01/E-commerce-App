
import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    const { addItemToCart } = useContext(CartContext);
    return(
        <div>
            <img src={imageUrl} alt={`${name}`}/>
            <span> {name} </span>
            <span> {quantity} </span>
            <span> {price} </span>
            <span> decrement </span>
            <span onClick={() => addItemToCart(cartItem)}> increment </span>
        </div>
    )
}

export default CheckoutItem;