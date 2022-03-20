import { useState, useEffect } from "react";
import env from "react-dotenv";
import axios from "axios";
import "../styles/Registration.css";

function Registration() {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(false);

  console.log(env.API_URL);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (isSubmit === true) {
      try {
        let res = await axios.post(`${env.API_URL}/users/register`, formValues);
        console.log(res.data);
        if (res) {
          setMessage(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>
              <h4>Name</h4>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p className="error_message">{formErrors.name}</p>
          <div className="field">
            <label>
              <h4>Email</h4>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className="error_message">{formErrors.email}</p>
          <div className="field">
            <label>
              <h4>Password</h4>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p className="error_message">{formErrors.password}</p>
          <button className="btn btn-lg btn-danger">Submit</button>
        </div>
        {message ? (
          <div className="ui message success">
            Acount registered successfully. Please check the activation link
            from your email.{" "}
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Registration;
