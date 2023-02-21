import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '../../store/auth/Auth.actions'

//import { loadProducts } from '../../store/products/Products.actions';

//import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css'
import '../Login/Login';
import { Link, Navigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button'

function Home() {
  const { userId } = useParams();  
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.auth)
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (userId) {
      async function isLoggedIn() {
        await dispatch(checkLoginStatus(userId));
      }
      isLoggedIn();
    }
  }, [loggedIn, userId, dispatch]);
  
  return (
      <div className="home-container">
        { !loggedIn &&
          <>
            <h1 style={{fontWeight: 200}} className="welcome">Welcome</h1> 
            <p className="home-info">At Ice-E we have a wide range of amazing accessories all from various designers brands at decent prices!</p>
            <p>Were sure youll find something thats right for you!</p> 
            <p className="home-info2">Click here to see are range of items...</p>
            <Button component={Link} id='view' to='/products'><b>Products</b></Button>
          </>
        }
        { loggedIn &&
          <>
            <h1 style={{fontWeight: 200}} className="welcome">Welcome back {user.userName}</h1>
            <div className='userButton'>
              <Button component={Link} id='view' to={`/users/${user.id}/account`}><b>Account</b></Button> 
              <Button component={Link} id='view' to={`/users/${user.id}/orders`}><b>Orders</b></Button>
              <Button component={Link} id='view' to={`/users/${user.id}/products`}><b>Products</b></Button>
            </div>
          </>
        }
        { user.google && !user.firstname &&
          <Navigate to={`/users/${user.id}/account/update`}/>
        }
    </div>
  );
}

export default Home;
