import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { DataContextProvider } from "./store/data-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
