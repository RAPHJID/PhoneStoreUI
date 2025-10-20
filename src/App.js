import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; 
import Phones from "./pages/Phones";
import PhoneDetails from "./pages/PhoneDetails";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />

      
<div className="pt-20">
  <Routes>
    <Route path="/" element={<Phones />} />
    <Route path="/phones/:id" element={<PhoneDetails />} />
    <Route path="/about" element={<About />} />
  </Routes>
</div>
    </Router>
  );
}


export default App;
