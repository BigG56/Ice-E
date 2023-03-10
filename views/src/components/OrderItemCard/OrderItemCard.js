import React from 'react';
import './OrderItemCard.css';

const OrderItemCard = (props) => {
    const { orderid, qty, price, productid, name, description, img} = props;
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
        </div>
      </div>
    )
}

export default OrderItemCard;