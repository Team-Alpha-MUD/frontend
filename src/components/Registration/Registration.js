import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";

// be endpoint
const URL = "";

function FormShape({ errors, touched, isSubmitting }) {

  const history = useHistory();

  return (
    <div style={{ position: "relative" }}>
      <div className="auth-container">
        <h1 data-testid="signup-head" className="auth-header">Sign Up</h1>
        <p className="dontHave">
          Already have an account? <Link data-testid="signin cta" to="/login">Sign In</Link>
        </p>
        <Form data-testid="signup" history={history} className="register-form">
          <div className = 'email'>
            
          <label htmlFor="username">Username</label>
          <Field className = 'register-input' placeholder="Username" type="text" name="username" />
          {touched.username && errors.username && (
            <p data-testid = "reg-c" className="error">{errors.username}</p>
          )}
          </div>
          
          <div className='passwords'>
          <div className='password'>
          <label htmlFor="password">Password</label>
          <Field className = 'register-input' placeholder="Password" type="password" name='password' />
          {touched.password && errors.password && (
            <p data-testid = "reg-d" className="error">{errors.password}</p>
          )}
          </div>
          <div className = 'confirm-password'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field className = 'register-input' placeholder = 'Confirm Password' type="password" name="confirmPassword" />
          {touched.confirmPassword && (
            <p data-testid = "reg-e" className="error">{errors.confirmPassword}</p>
          )}
          </div>
          </div>
          <Button color="primary" type="submit" data-testid="getstarted">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default withFormik({
  mapPropsToValues({ username, password, confirmPassword }) {
    return {
      username: username || "",
      password: password || "",
      confirmPassword: confirmPassword || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password cannot be more than 16 characters.")
      .required("Password must be 8 to 16 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("You must confirm your password")
  }),
  handleSubmit(
    values,
    {
      setSubmitting,
      props: { history }
    }
  ) {
    const packet = {
      username: values.username,
      password: values.password,
    };
    // setLoad(true)
    setSubmitting(true)
    axios
      .post(URL, packet)
      .then(res => {
        // setLoad(false)
        setSubmitting(false)
      /*
        res.data.user.role = "student";
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", encrypt(res.data.user.role, process.env.REACT_APP_ROLE_KEY));
        localStorage.setItem("fname", res.data.user.firstName);
        localStorage.setItem("email", res.data.user.email);
        history.push(`/${res.data.user.role}/dashboard`);
        */
      })
      .catch(err => {
        // setLoad(false)        
        setSubmitting(false)
      });
  }
})(FormShape);
