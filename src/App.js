
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Phones from "./pages/Phones";
import PhoneDetails from "./pages/PhoneDetails";
import About from "./pages/About";
import Navbar from "./pages/Navbar";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Phones />} />
        <Route path="/phones/:id" element={<PhoneDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
