import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss'

const Checkout = () => {
    const { cartItems } = useContext(CartContext);

    return(
        <div>
            <h1> Checkout</h1>
            {cartItems.map((item) => {
                <CheckoutItem  key={item.id} cartItem={item}/>
            })}
        </div>
    )
}

export default Checkout;