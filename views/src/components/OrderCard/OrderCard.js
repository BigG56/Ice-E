import React from 'react';
import Button from '@mui/material/Button';
import Moment from 'react-moment';
import Divider from '@mui/material/Divider';

import './OrderCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const OrderCard = (props) => {

  const { created, id, total, status} = props;
  const user  = useSelector(state => state.user);
  const {delivery} = useSelector(state => state.user);
  const itemTotal = total / 100;
  //const orderItems = useSelector(state => state.orderItems);
  

  return (
    <div className="order-card-container">
      <div className="order-card-header">
        <div className="order-card-header-row">
          <p className="order-card-header-title top">Order Placed</p>
          <p className="order-card-header-title top">Total</p>
          <p className="order-card-header-title top">Policy Sent To</p>
          <p className="order-card-header-title top">{`Order # ${id}`}</p>
        </div>
        <div className="order-card-header-row">
          <p className="order-card-header-title bottom">
            <Moment format="LL">{created}</Moment>
          </p>
          <p className="order-card-header-title bottom">{`£${itemTotal}`}</p>
          <p className="order-card-header-title bottom">{`${user.email}`}</p>
          <div className="order-card-action-container">
            <p className="order-card-header-title bottom">Invoice</p>
          </div>
        </div>
      </div>
      <Divider/>
      <div className="order-card-content">
        <div className="order-card-content-info">
          <p className="title" style={{width: '120px', textAlign: 'center'}}><b>Ice-E</b></p>
          <p>Thank you for your purchase from the the Ice-E!</p>
        </div>
        <div className="deliverTo">
          <p style={{textDecoration: 'underline'}}>D<b>elivery</b></p>
          <p>{delivery.addressline1}</p>
          <p>{delivery.addressline2}</p>
          <p>{delivery.city}</p>
          <p>{delivery.county}</p>
          <p>{delivery.postcode}</p>
        </div>
        <div className="order-card-content-action-container">
          <Button id="view" type="contained" component={Link} to={`/users/${user.id}/orders/${id}`}>OrderDetails</Button>
          <Divider/>
          <Button variant="contained" id='view' component={Link} to ={`/users/${user.id}/products`}>Buy more</Button>
        </div>
      </div>
      <Divider/>
      <div className="order-card-footer"  style={{color:'black'}}>Status: <b>{status}</b></div>
    </div>
  )
}

export default OrderCard;