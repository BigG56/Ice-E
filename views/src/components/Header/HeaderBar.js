import './Header.css';
import React from'react';
import {IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import { logoutUser } from '../../store/auth/Auth.actions';


const Header = () => {
  return (
      <header className="head">
          <div className="header-bar">
              <p className="title">Ice-E</p>
              <div className="button-container">
                  <Button color="inherit" component={Link} to="/"><b>Home</b></Button>
                  <Button color="inherit" component={Link} to="/auth/login"><b>Login</b></Button>
              <IconButton aria-label="access shopping cart" color="inherit">
                <Badge overlap="rectangular" color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
      </header>
  )
}

export default Header;