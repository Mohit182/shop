import "../src/styles/styles.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import List from "./routes/List/List";

function App() {
  return (
    <Router>
      <div className="App">
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
