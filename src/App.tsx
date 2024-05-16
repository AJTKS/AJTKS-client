import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ResultPage from "./Pages/ResultPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result/:task_id" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
