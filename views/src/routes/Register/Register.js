import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import './Register.css';
import { registerUser } from '../../store/auth/Auth.actions';

import * as Yup from 'yup';

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  

  function successMessage() {
    setTimeout(message, 2000);
  }

  function message() {
    alert("Successfully Registered!");
  }

  // Registration handler
  const handleRegister = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(registerUser(credentials));
      setIsLoading(false);
      history('/auth/login');
      successMessage();
    } catch(err) {
      setIsLoading(false);
    }
  }

  const registrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email address is required."),

    userName: Yup.string()
      .required("Username is required."),

    firstname: Yup.string()
      .required("First name is required."),

    lastname: Yup.string()
      .required("Last name is required."),

    password: Yup.string()
      .required("Password is required."),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match.")
      .required("Confirm password is required.")
  })

  return (
    <div className="regForm">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{email: "", userName: "", firstname: "", lastname: "", password: "", confirmPassword:''}}
            validationSchema={registrationSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { email, userName, firstname, lastname, password } = data;
              await handleRegister({email, userName, firstname, lastname, password });
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Register</h1>
              </header>
              <TextField
                label="Email"
                name="email"
                id="email-input"
              />
              <TextField
                label="UserName"
                name="userName"
                id="userName-input"
              />
              <TextField
                label="Firstname"
                name="firstname"
                id="firstname-input"
              />
              <TextField
                label="Lastname"
                name="lastname"
                id="lastname-input"
              />
              <TextField
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              <TextField
                label="ConfirmPassword"
                name="confirmPassword"
                id="confirm-password-input"
                type="password"
              />
              {
                error && <div>{error}</div>
              }
              <Button variant="contained" type="submit" isLoading={isLoading} style={{backgroundColor: "black", color: "turquoise", border: "2px solid turquoise"}}>Submit</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;