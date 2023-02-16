import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Buttons from '../../components/Button/Button';
import TextFields from '../../components/TextField/TextField';

import './Login.css';

import { loginUser } from '../../store/auth/Auth.actions';

import * as Yup from 'yup';

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Login handler
  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials));
      setIsLoading(false);
      history('/');
    } catch(err) {
      setIsLoading(false);
    }
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),

    password: Yup.string()
      .required("Password is required")
  })

  return (
    <div className="app">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            validateOnBlur
            onSubmit={async (values) => {
              const { email, password } = values;
              await handleLogin({email, password});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Log in</h1>
              </header>
              <TextFields
                label="Email"
                name="email"
                id="email-input"
              />
              <TextFields
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              {
                error && <div>{error}</div>
              }
              <Buttons variant="contained" color="primary" type="submit" isLoading={isLoading}>Submit</Buttons>
              <p>Forgotten your password?</p>
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <p>Sign in with</p>
              </div>
              <div className="social-btn-container">
                <Buttons variant="contained" id="google-btn" href="/api/auth/google">Google</Buttons>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;