import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import Incrementer from '../../components/Incrementer/Incrementer';

import { addItem } from '../../store/cart/Cart.actions';
import { loadProduct } from '../../store/products/Products.actions';
import './ProductDetails.css';
import '../Login/Login';

function ProductDetails() {

  const { productId } = useParams();

  const [ quantity, setQuantity ] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { loggedIn } = useSelector(state => state.auth);
  const user  = useSelector(state => state.user)
  const { cart } = useSelector(state => state.cart);
  const cartId = cart.id;
  
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

  const Item = {
    cartId: cartId,
    product: product,
    qty: quantity
  }

  async function handleAddToCart() {
    await dispatch(addItem(Item));
  }

  return (
    <section className="product-details-container">
      <div className="product-img-container">
        <img src={product.img} alt='product' id="prodImg"></img>
      </div>
      <div className="product-info-container">
        { product &&
          <div className="product-info-container">
            <Typography id="prodTitle" style={{fontFamily:'Rightous, cursive', textDecoration: 'underline'}} variant="h3">{product?.name}</Typography>
            <Typography variant="h6">{product?.description}</Typography>
            <Typography id='price' variant="h2">£<b>{product?.price}</b></Typography>
            { !loggedIn &&
              <Button type="contained" id='view' component={Link} to ='/products' color="primary">Back</Button>
            }
            { loggedIn &&
              <div className='buttons'>          
                <Incrementer
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                  value={quantity}
                />
                <Button type="contained" id='view' onClick={handleAddToCart} color="primary">Add to Cart</Button>
                <Button type="contained" id='view' component={Link} to ={`/users/${user.id}/products`} color="primary">Back</Button>
              </div>
            } 
          </div>
        }
      </div>
    </section>
  );
}

export default ProductDetails;