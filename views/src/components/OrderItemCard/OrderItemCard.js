import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './OrderItemCard.css';
import { useSelector } from 'react-redux';

const OrderItemCard = (props) => {
    const { orderid, qty, price, productid, name, description, img} = props;
    const user = useSelector(state => state.user);
    const total = price * qty;

    return (
      <div className="order-item-card">
        <img className="orderItemImg" src={img} alt='product'/>
        <div className='itemDescription'>
          <div className="itemName">
            <p><b>{name}</b></p>
          </div>
          <p>{description}</p>
          <p><b>Total</b>: £{total}</p>
          <p><b>Qty</b>: {qty}</p>
          <p><b>Product Id</b>: {productid}</p>
          <p><b>Order</b>: {orderid}</p>
          <Button type="contained" id='view' component={Link} to ={`/users/${user.id}/products/${productid}`} color="primary">Back</Button>
        </div>
      </div>
    )
}

export default OrderItemCard;