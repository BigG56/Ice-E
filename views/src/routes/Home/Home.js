import React, { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';

//import { loadProducts } from '../../store/products/Products.actions';

//import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css'
import '../Login/Login';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'

function Home() {
  
  return (
    <div className="home-container">
        <h1 style={{fontWeight: 200}} className="title">Welcome</h1> 
        <p className="home-info">At Ice-E we have a wide range of amazing accessories all from various designers brands at decent prices!</p>
        <p>Were sure youll find something thats right for you!</p> 
        <p className="home-info2">Click here to see are range of items...</p>
        <Button component={Link} id='view' to='/products'><b>Products</b></Button>
    </div>
  );
}

export default Home;
