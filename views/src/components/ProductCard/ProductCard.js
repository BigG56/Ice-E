import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './ProductCard.css';
import { useSelector } from 'react-redux';

function ProductCard(props) {
  const { data } = props;
  const {loggedIn} = useSelector(state => state.auth);

  return (
    <div className="grid-item">
      <div className="product-card-info-container">
        <div className="product-card-info">
          <img id="prod_img" src={data.img} alt="product pic"/>
          <p style={{textDecoration:'underline'}}>{data.name}</p>
          <p>£<b>{data.price}</b></p>
          <p>{data.type}</p>
        </div>
        { !loggedIn &&
          <>
            <Button
              id="view" 
              variant="outlined"
              color="primary"
              component={Link}
              to={`/products/${data.id}/${data.type}/${data.metal}`}>View</Button>
          </>
        }
        { loggedIn &&
          <>
            <Button
              id="view" 
              variant="outlined"
              color="primary"
              component={Link}
              to={`${data.id}/${data.type}/${data.metal}`}>View</Button>
          </>
        }
      </div>
    </div>
  );
}

export default ProductCard;