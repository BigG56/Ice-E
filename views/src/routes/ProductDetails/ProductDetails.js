import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import Incrementer from '../../components/Incrementer/Incrementer';

//import { addItem } from '../../store/cart/Cart.actions';
import { loadProduct } from '../../store/products/Products.actions';
import './ProductDetails.css';
import '../Login/Login';

function ProductDetails() {

  const { productId } = useParams();

  const [ quantity, setQuantity ] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { loggedIn } = useSelector(state => state.auth);
  
  const product = products[productId];

  useEffect(() => {
    if (!products[productId]) {
      (async function load() {
        await dispatch(loadProduct(productId))
      })();
    }
  }, [dispatch, products, productId]);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  /*async function handleAddToCart() {
    await dispatch(addItem(product, quantity));
    onClick={handleAddToCart}
  }*/

  return (
    <section className="product-details-container">
      <div className="product-img-container">
        <img src={product.img} alt='product' className="prodImg"></img>
      </div>
      <div className="product-info-container">
        { product &&
          <>
            <Typography style={{fontFamily:'Rightous, cursive', textDecoration: 'underline'}} variant="h3">{product?.name}</Typography>
            <Typography variant="h6">{product?.description}</Typography>
            <Typography className='price' variant="h2">£<b>{product?.price}</b></Typography>
            { loggedIn &&
            <div className='buttons'>          
              <Incrementer
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                value={quantity}
              />
              <Button type="contained" id='view' color="primary">Add to Cart</Button>
              <Button type="contained" id='view' component={Link} to ='/products' color="primary">Back</Button>
            </div>
            } 
          </>
        }
      </div>
    </section>
  );
}

export default ProductDetails;