import React from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import './UpdateDetailsForm.css';
import { updateDetails } from '../../store/user/Users.actions';

import * as Yup from 'yup';

const UpdateDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { userId } = useParams()

  const handleUpdate = async (credentials) => {
    try {
      await dispatch(updateDetails(credentials));
      navigate(`/users/${user.id}/account`)
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  const updateSchema = Yup.object().shape({
    userName: Yup.string(),
    firstname: Yup.string(),
    lastname: Yup.string()
  })

  return (
    <div className="updForm">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{userName: "", firstname: "", lastname: ""}}
            validationSchema={updateSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { userName, firstname, lastname } = data;
              await handleUpdate({userId, userName, firstname, lastname});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">New Info</h1>
              </header>
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
              <Button variant="contained" type="submit"style={{backgroundColor: "black", color: "turquoise", border: "2px solid turquoise"}}>Submit</Button>
              <Button type="contained" id='view' component={Link} to ={`/users/${user.id}/account`} color="primary">Back</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UpdateDetails;