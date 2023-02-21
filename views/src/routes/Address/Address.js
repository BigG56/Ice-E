/*import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import './Address.css';
import { deliveryAddress } from '../../store/user/Users.actions';

import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const AddressPage = () => {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { userId } = useParams()

  // Registration handler
  const handleAddress = async (credentials) => {
    try {
      await dispatch(deliveryAddress(credentials));
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  // Validation schema for registration form
  const addressSchema = Yup.object().shape({
    addressline1: Yup.string()
      .required("address line 1 is required."),

    addressline2: Yup.string()
      .required("address line 2 is required."),

    city: Yup.string()
      .required("city is required."),

    county: Yup.string()
      .required("county is required."),

    postcode: Yup.string()
      .required("postcode is required.")
  })

  return (
    <div className="regForm">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{addressline1: "", addressline2: "", city: "", county: "", postcode: ""}}
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
                label="AddressLine 1"
                name="addressline2"
                id="addressline1-input"
              />
              <TextField
                label="AddressLine 2"
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
}*/

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import './Address.css';
import { deliveryAddress } from '../../store/user/Users.actions';

import * as Yup from 'yup';

const DeliveryAddress = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();


  // Registration handler
  const handleAddress = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(deliveryAddress(credentials));
      setIsLoading(false);
      history('/users');
    } catch(err) {
      setIsLoading(false);
    }
  }

  // Validation schema for registration form
  const addressSchema = Yup.object().shape({
    addressline1: Yup.string()
      .required("addressline1 is required."),

    aaddressline2: Yup.string()
      .required("addressline2 is required."),

    city: Yup.string()
      .required("city is required."),

    county: Yup.string()
      .required("county is required."),

    postcode: Yup.string()
      .required("postcode is required.")
  })

  return (
    <div className="regForm">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{addressline1: "", addressline2: "", city: "", county: "", postcode: ""}}
            validationSchema={addressSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { addressline1, addressline2, city, county, postcode } = data;
              await handleAddress({userId, addressline1, addressline2, city, county, postcode});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Register</h1>
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
                type="postcode"
              />
              <Button variant="contained" type="submit" isLoading={isLoading} style={{backgroundColor: "black", color: "turquoise", border: "2px solid turquoise"}}>Submit</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;