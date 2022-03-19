import React from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = props => {
    const cartCtx = useContext(CartContext);
    // const totalAmount = cartCtx.totalAmount;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {

    }

    const cartItemAddHandler = (item) =>{

    }
    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler(null, item)} />)}</ul>

    return (
        <>
        <Modal hideCart={props.hideCart}>
            <div>
                {cartItems}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartCtx.totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}  onClick={props.hideCart}>Close</button>
                {hasItems &&
                <button className={classes.button}>Order</button>
                }
            </div>
        </Modal>
        </>
    );
};

export default Cart;