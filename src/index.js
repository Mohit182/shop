import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import { initialState, reducer } from "./context/Reducer";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="*" element={<App />} />
          </Switch>
        </Router>
      </CookiesProvider>
    </StateProvider>
  </React.StrictMode>
);
