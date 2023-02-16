import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material'

function TextFields(props) {
    const { name, ...rest } = props;
    const [ field, { error } ] = useField({ name, type: name });

    return (
        <TextField
          {...field}
          {...rest}
          error={!!error}
          helperText={error}
          variant="outlined"
        />
      );

}
export default TextFields;