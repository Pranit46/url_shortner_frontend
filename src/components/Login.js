import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  let navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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
        let res = await axios.post(`${env.API_URL}/users/login`, formValues);
        console.log(res.data);
        navigate("/url-shortner");
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
        <h1>Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
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
          <p className="pass_wrapper">
            <a href="/" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </a>{" "}
            <a href="/">Reset Password</a>
          </p>
          <button className="btn btn-lg btn-danger">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
