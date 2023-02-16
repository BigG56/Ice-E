import React from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Buttons(props) {

  const { children, isLoading, ...rest } = props;

  return (
    <Button {...rest}>
      {!isLoading && children}
      {isLoading && <CircularProgress color="secondary"/>}
    </Button>
  );
}

export default Buttons;