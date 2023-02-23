import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import './Address.css';
import { addAddress } from '../../store/user/Users.actions';

import * as Yup from 'yup';

const AddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { userId } = useParams()

  // Registration handler
  const handleAddress = async (credentials) => {
    try {
      await dispatch(addAddress(credentials));
      navigate(`/users/${user.id}/account`)
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  // Validation schema for registration form
  const addressSchema = Yup.object().shape({
    addressline1: Yup.string(),
    addressline2: Yup.string(),
    city: Yup.string(),
    county: Yup.string(),
    postcode: Yup.string(),
  })

  return (
    <div className="regForm">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{addressline1: "", addressline2: "", city: "", county:"", postcode:""}}
            validationSchema={addressSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { addressline1, addressline2, city, county, postcode } = data;
              await handleAddress({userId, addressline1, addressline2, city, county, postcode});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Delivery</h1>
              </header>
              <TextField
                label="Addressline1"
                name="addressline1"
                id="addressline1-input"
              />
              <TextField
                label="Addressline2"
                name="addressline2"
                id="addressline2-input"
              />
              <TextField
                label="City"
                name="city"
                id="city-input"
              />
              <TextField
                label="County"
                name="county"
                id="county-input"
              />
              <TextField
                label="Postcode"
                name="postcode"
                id="postcode-input"
              />
              <Button variant="contained" type="submit"style={{backgroundColor: "black", color: "turquoise", border: "2px solid turquoise"}}>Submit</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;