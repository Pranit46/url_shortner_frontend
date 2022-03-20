import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
 


  return (
    <>
      <nav>
        <input type="checkbox" checked="checked" id="check" />
        <label for="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        {/* <img className="card-img-top" src="https://logodix.com/logo/2011108.jpg" alt="Card cap" /> */}
        <ul>
          <li>
            <Link className="active" to="/">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/" >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
