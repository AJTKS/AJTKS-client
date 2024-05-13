import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultPage from "./Pages/ResultPage";
import MainPage from "./Pages/MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
