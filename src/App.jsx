import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import MyProjectsPage from "./components/MyProjectsPage";
import SingleProjectPage from "./components/SingleProjectPage";
import EmptyComponent from "./components/EmptyComponent";
import { ProjectProvider } from "./components/ProjectContext";

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <div className="app-container">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<EmptyComponent />} />
            <Route
              path="/my-projects"
              element={
                <MyProjectsPage/>
              }
            />
            <Route
              path="/my-projects/:projectName"
              element={
                <SingleProjectPage/>
              }
            />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;
