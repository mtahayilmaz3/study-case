import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import TextList from "./TextList";

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/liste" element={<TextList />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
