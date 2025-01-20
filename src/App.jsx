import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProjectsPage from "./components/MyProjectsPage";
import SingleProjectPage from "./components/SingleProjectPage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/my-projects" element={<MyProjectsPage />} />
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
