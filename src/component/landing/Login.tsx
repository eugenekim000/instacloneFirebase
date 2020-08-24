import React, { ReactElement } from "react";
import "../../styling/Landing.css";
import { Link } from "react-router-dom";

interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <div className="login-container">
      <div className="login-main-container">
        <section className="login-image-container">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
        </section>

        <form className="login-input-forms">
          <div className="login-input-wrapper">
            <input placeholder="Email"></input>
          </div>
          <div className="login-input-wrapper">
            <input placeholder="Password"></input>
          </div>

          <button>Log in</button>
        </form>

        <p>Forgot password?</p>
      </div>

      <section className="login-pw-recover-container">
        <div>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#0095f6", fontWeight: "bold" }}>
            Sign up
          </Link>
        </div>
      </section>

      <section className="login-github">
        <p>View on GitHub</p>
      </section>
    </div>
  );
}
