import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BookContextProvider } from "./context/BookContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
