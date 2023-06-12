import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

import './cart-icon.styles.scss'

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, total} = useContext(CartContext);

    const toggleIsCartOppen = () => setIsCartOpen(!isCartOpen);

    return(
        <div className='cart-icon-container' onClick={toggleIsCartOppen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{total}</span>
        </div>
    )
}

export default CartIcon