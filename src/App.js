import "../src/styles/styles.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import List from "./routes/List/List";
import { Button } from "@mui/material";

function App() {
  return (
    <Router>
      <div className="App">
        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Logout
        </Button>
        <Switch>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
