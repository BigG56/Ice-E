import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';

import Incrementer from '../Incrementer/Incrementer';

import { removeItem, updateItem } from '../../store/cart/Cart.actions';

import './CartItemCard.css';

function CartItemCard(props) {
    
  const { cartitemid, price, qty, name, img} = props;
  const [ quantity, setQuantity ] = useState(qty);
  const total = price * qty;

  const dispatch = useDispatch();
  
  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  const updatedItem = {
    cartitemid: cartitemid,
    qty: quantity
  }
  

  async function remove() {
    await dispatch(removeItem(cartitemid));
  }
  async function update() {
    await dispatch(updateItem(updatedItem))
  }

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <p style={{width:"200px"}}>{name}</p>
          <img alt="product" className="cartImg"src={img} />
        </div>
        <div className="cart-item-increment">
        <p style={{color:"black", backgroundColor: "turquoise", marginBottom: "5px"}} onClick={update}>Update</p>
          <Incrementer
            id="qty"
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            value={quantity}
          />
          <p style={{border: "2px solid turquoise", backgroundColor: "red", color:"black"}}onClick={remove}>Remove</p>
        </div>
        <div className="cart-item-price">
          <p id="total">{`£${total}`}</p>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default CartItemCard;