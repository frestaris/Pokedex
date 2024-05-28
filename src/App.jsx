import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Card from "./Card";
import Footer from "./Footer";

const App = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <Router>
      <div>
        <Header setSelectedType={setSelectedType} />
        <Routes>
          <Route path="/" element={<Card selectedType={selectedType} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
