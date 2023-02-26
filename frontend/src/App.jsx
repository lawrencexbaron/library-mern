import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="bg-gray-100 min-h-screen h-auto flex flex-col items-center justify-center py-20">
          <Navbar />
          {/* <img
            src={reactLogo}
            alt="React Logo"
            className="w-32 rotate-180 animate-spin mb-10 over"
          /> */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
