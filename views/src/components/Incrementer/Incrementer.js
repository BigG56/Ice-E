import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon  from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'


const Incrementer = (props) => {
  const { value, onDecrement, onIncrement } = props;

  return (
    <div style={{backgroundColor: 'turquoise', width: '160px', height:'55px'}}>
      <IconButton aria-label="remove from shopping cart" onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField style={{width:'80px', height:'10px'}}variant="outlined" value={value} />
      <IconButton aria-label="add to shopping cart" onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default Incrementer;