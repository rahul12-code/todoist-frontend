import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import Projects from "./components/Projects";
import MyProjectsPage from "./components/MyProjectsPage";

import { TodoistApi } from "@doist/todoist-api-typescript";
import EmptyComponent from "./components/EmptyComponent";

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const App = () => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .getProjects()
      .then((projects) => {
        const allProjects = projects.filter(
          (project) => project.name !== "Inbox"
        );
        setProjects(allProjects);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<EmptyComponent />} />
          <Route
            path="/my-projects"
            element={<MyProjectsPage 
              projects={projects} 
              api={api}/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
