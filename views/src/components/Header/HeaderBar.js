import './HeaderBar.css';
import React from'react';
import { IconButton } from '@mui/material';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {

  const { loggedIn } = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const { cart } =useSelector(state => state.cart);

  const logout = () => {
    window.open('http://localhost:8000/home/auth/logout', '_self')
  }

  return (
      <header className="head">
          <div className="header-bar">
              <p className="title"><b>Ice-E</b></p>
              <div className="button-container">
                  { !loggedIn &&
                    <>
                      <Button color="inherit" component={Link} to='/'><b>Home</b></Button>
                      <Button color="inherit" component={Link} to="/auth/login"><b>Login</b></Button>
                    </>
                  }
                  { loggedIn &&
                    <>
                      <Button color="inherit" component={Link} to={`/users/${user.id}`}><b>Home</b></Button>
                      <Button  onClick={logout} color="inherit"><b>Logout</b></Button>
                      <IconButton aria-label="access shopping cart" component={Link} to={`users/${user.id}/carts/${cart.id}`} color='inherit'>
                        <Badge overlap="rectangular" color='primary' badgeContent={cart.items?.length || 0}>
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    </>
                  }
            </div>
          </div>
      </header>
  )
}

export default Header;