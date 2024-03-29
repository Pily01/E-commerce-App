
import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const removeItemHandler = () => removeItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);    
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'> {name} </span>
            
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}> - </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}> + </div>
            </span>
            
            <span className='price'> {price} </span>
            <div onClick={clearItemHandler} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;