import "../src/styles/styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
            top: "0",
            right: "0",
            margin: "10px",
          }}
          sx={{ margin: "10px" }}
        >
          Logout
        </Button>
      )}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/list/:id" element={<List />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
