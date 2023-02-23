import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '../../store/auth/Auth.actions';
import './Home.css';
import '../Login/Login';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
  const { userId } = useParams();  
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.auth);
  const user = useSelector(state => state.user);


  useEffect(() => {
    if (userId || user.google) {
      async function isLoggedIn() {
        await dispatch(checkLoginStatus(userId));
      }
      isLoggedIn();
    }
  }, [user.google, userId, dispatch]);
  
  return (
      <div className="container">
        { !loggedIn &&
          <div className="home-container">
            <h1 style={{fontWeight: 200}} className="welcome">Welcome</h1> 
            <p className="home-info">At Ice-E we have a wide range of amazing accessories all from various designers brands at decent prices!</p><br/>
            <p>Create a account or log-in to purchase, were sure youll find something thats right for you!</p><br/> 
            <p className="home-info2">Click here to see are range of items...</p>
            <Button component={Link} id='view' to='/products'><b>Products</b></Button>
          </div>
        }
        { loggedIn &&
          <div className="home-container">
            <h1 style={{fontWeight: 200}} className="welcome">Welcome back <span><b>{user.userName}</b>v </span></h1>
            <div className='userButton'>
              <Button component={Link} id='view' to={`/users/${user.id}/account`}><b>Account</b></Button> 
              <Button component={Link} id='view' to={`/users/${user.id}/orders`}><b>Orders</b></Button>
              <Button component={Link} id='view' to={`/users/${user.id}/products`}><b>Products</b></Button>
            </div>
          </div>
        }
        { user.google && !user.firstname &&
          <Navigate to={`/users/${user.id}/account/update`}/>
        }
    </div>
  );
}

export default Home;
