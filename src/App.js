import "../src/styles/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import List from "./routes/List/List";
import { Button } from "@mui/material";
import React from "react";

import { useCookies } from "react-cookie";
function App() {
  const [token, setToken] = React.useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  React.useEffect(() => {
    setToken(cookies.token);
  }, [cookies.token]);

  return (
    <div className="App">
      {token !== undefined && token !== null && (
        <Button
          variant="contained"
          onClick={() => {
            removeCookie("token");
            window.location.reload();
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            margin: "10px",
          }}
        >
          Logout
        </Button>
      )}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            token !== undefined && token !== null && token ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/list/:id"
          element={
            token !== undefined && token !== null && token ? (
              <List />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* all extra routes redirect to "/" if token present, if not redirect to "/login" */}
        <Route
          path="*"
          element={
            token !== undefined && token !== null && token ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
