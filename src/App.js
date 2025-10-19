import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Phones from "./pages/Phones";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Phones />} />
      </Routes>
    </Router>
  );
};

export default App;
