
import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    const { addItemToCart, removeItemFromCart } = useContext(CartContext);
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'> {name} </span>
            <span className='arrow' onClick={() => removeItemFromCart(cartItem)}> - </span>
            <span className='quantity'> {quantity} </span>
            <span className='arrow' onClick={() => addItemToCart(cartItem)}> + </span>
            <span className='price'> {price} </span>
            <div className='remove-button'>&#10005;</div>

            
            
           
        </div>
    )
}

export default CheckoutItem;