import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Phones from "./pages/Phones";

function App() {
  return (
    <Router>
      <Routes>
        {/* Only render Phones when URL is /phones */}
        <Route path="/phones" element={<Phones />} />
        <Route path="/" element={<h1 className="text-center mt-10">Welcome Home</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
