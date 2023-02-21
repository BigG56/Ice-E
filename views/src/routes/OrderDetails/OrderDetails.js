import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadOrderItems } from '../../store/orderItems/OrderItems.actions'
import OrderItemCard  from '../../components/OrderItemCard/OrderItemCard';
import Button from '@mui/material/Button'

function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const orderItems = useSelector(state => state.orderItems);
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    async function load() {
      await dispatch(loadOrderItems(orderId));
    }
    load();
  }, [orderId, dispatch]);

  return (
    <div style={{textAlign: 'center',overflowX:'auto', overflowY:'auto', height:'700px'}}>
      <div style={{ display: 'flex', justifyContent:'space-between', backgroundColor: 'turquoise', border: "2px solid", margin: "10px", borderRadius:'20px'}}>
        <p style={{ fontSize: 40, fontFamily:'rightou, cursive'}}>OrderDetails</p>
        <Button type="contained" id='view' component={Link} to ={`/users/${user.id}/orders`} style={{borderRadius:'20px', backgroundColor:'black', color: 'turquoise'}}>Back</Button>
      </div>
      { 
        Object.keys(orderItems).map((key) => {
          const Item = orderItems[key];
          return <OrderItemCard {...Item} key={Item.id} />
        })
      }
    </div>
  );
}

export default OrderDetails;
