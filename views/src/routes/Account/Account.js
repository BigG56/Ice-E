import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import './Account.css';

function Account() {
  const user  = useSelector(state => state.user);

  return (
    <section>
      <div className='accountBar'>
        <p style={{textAlign: 'center', fontSize: 60, color: 'turquoise', fontFamily: 'rightous, cursive'}}>Account: <b>{user.userName}</b></p>
        <Button variant="contained" id='view' component={Link} to ={`/users/${user.id}/account/update`}>Change Info</Button>
      </div>
      <div className='infoBox'>
        <p className='userInfo'><b>Firstname</b> = {user.firstname}</p>
        <p className='userInfo'><b>lastname</b> = {user.lastname}</p>
        { !user.google &&
          <p className='userInfo'><b>Email</b> = {user.email}</p>
        }
        <p className='userInfo'><b>Username</b> = {user.userName}</p>
      </div>
      <div className='accountBar'>
        <p style={{textAlign: 'center', fontSize: 60, color: 'turquoise', fontFamily: 'rightous, cursive'}}>Delivery Address</p>
        <Button variant="contained" id='view' component={Link} to ={`/users/${user.id}/account/update`}>Change Info</Button>
      </div>
      { !user.address_id &&
        <div className='address'>
          <Button style={{height:'100px'}} variant="contained" id='view' component={Link} to ={`/users/${user.id}/account/address`}>Add address</Button>
        </div>
      }
   </section>
  );
}

export default Account;