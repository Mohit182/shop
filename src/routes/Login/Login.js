import React, { useState } from "react";
// import "./Login.css";
// import amazonLogo from "../../Assets/amazonLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Button, TextField } from "@mui/material";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history("/");
      })
      .catch((error) => alert(error.message));
  };
  const registerHandler = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      {/* <Link to="/">
        <img className="login-logo" src={amazonLogo} />
      </Link> */}
      <div
        className="login-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Sign In</h1>

        <TextField
          placeholder="E-mail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ margin: "10px" }}
        />

        <TextField
          placeholder="Password"
          type="password"
          value={password}
          sx={{ margin: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          onClick={signInHandler}
          variant="contained"
          color="primary"
          className="login-signInButton"
          sx={{ margin: "10px" }}
        >
          Sign In
        </Button>
        <Button
          onClick={registerHandler}
          variant="outlined"
          color="primary"
          className="login-registerButton"
          sx={{ margin: "10px" }}
        >
          Create your Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
