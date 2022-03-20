import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifiedPage.css";

function VerifiedPage() {
    let navigate = useNavigate();
  return (
    <>
      <div className="maincontainer_wrapper">
        <div className="subcontainer_wrapper">
          <img
            src="https://www.criminallyprolific.com/wp-content/uploads/2021/03/business-email-template.png"
            alt="email-sign"
          />
          <h1>Your Email address is verified!</h1>
          <h5>Please click below to login your acount.</h5>
          <button className="btn btn-lg btn-danger" onClick={() => navigate(`/login`)}>login</button>
        </div>
      </div>
    </>
  );
}

export default VerifiedPage;
