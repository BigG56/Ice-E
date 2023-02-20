import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CartItemCard from '../../components/CartItemCard/CartItemCard';

import './Cart.css';

function Cart() {

  const { cart } = useSelector(state => state.cart);
  const  user  = useSelector(state => state.user);

  function calculateTotal() {
    return cart.items.reduce((total, { price, qty }) => {
      total += price * qty
      return total
    }, 0 )
  }


  return (
    <section className="cart-details-container">
      <div className="cart-info-container">
        <p style={{fontSize: 60, color: 'black', fontFamily: 'rightous, cursive'}}>Cart</p>
        <div className="cart-info-header">
          <div className="details">
            <Typography variant="h6">
              Product
            </Typography>
          </div>
          <div className="qty">
            <Typography variant="h6">
              Qty
            </Typography>
          </div>
          <div className="price">
            <Typography variant="h6">
              Total
            </Typography>
          </div>
        </div>
       {
        cart.items.map(item => {
          return (
            <CartItemCard key={item.id} {...item} />
          )
        })
       }
      </div>
      <div className="cart-summary-container">
        <div className="cart-summary-container-inner">
          <Divider className="checkout-divider"/>
          <div className="order-summary-container">
            <Typography variant="h6">
              Order Summary
            </Typography>
            <div className="order-line-item">
              <p><b>Subtotal</b></p>
              <p>£{calculateTotal()}</p>
            </div>
            <div className="order-line-item">
              <p><b>Shipping</b></p>
              <p>FREE</p>
            </div>
            <Divider className="checkout-divider"/>
            <Button
            variant="contained"
            className="checkout-btn"
            component={Link}
            to={`/users/${user.id}/carts/${cart.id}/checkout`}
          >Checkout</Button>
            <div className="order-line-item">
              <Typography>Total</Typography>
              <Typography>£{calculateTotal()}</Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;