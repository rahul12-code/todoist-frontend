import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import MyProjectsPage from "./components/MyProjectsPage";
import SingleProjectPage from "./components/SingleProjectPage";
import { ProjectProvider } from "./components/ProjectContext";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MyProjectsPage />} />
          <Route
            path="/my-projects/:projectName"
            element={<SingleProjectPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
