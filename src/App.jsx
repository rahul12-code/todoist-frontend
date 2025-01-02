import React from "react";
// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
// import Projects from "./components/Projects";
import MyProjectsPage from "./components/MyProjectsPage";
import SingleProjectPage from "./components/SingleProjectPage";

// import { TodoistApi } from "@doist/todoist-api-typescript";
import EmptyComponent from "./components/EmptyComponent";
import { ProjectProvider } from "./components/ProjectContext";

// const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const App = () => {
  // const [projects, setProjects] = useState([]);
  // const [selectedProjectId, setSelectedProjectId] = useState(null);

  // useEffect(() => {
  //   api
  //     .getProjects()
  //     .then((projects) => {
  //       const allProjects = projects.filter(
  //         (project) => project.name !== "Inbox"
  //       );
  //       setProjects(allProjects);
  //     })
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

  // const inbox = projects.filter((project) => project.name === "Inbox");

  return (
    <ProjectProvider>
      <Router>
        <div className="app-container">
          <Sidebar
            // selectedProjectId={selectedProjectId}
            // setSelectedProjectId={setSelectedProjectId}
          />
          <Routes>
            <Route path="/" element={<EmptyComponent />} />
            <Route
              path="/my-projects"
              element={
                <MyProjectsPage
                  // projects={projects}
                  // api={api}
                  // selectedProjectId={selectedProjectId}
                  // setSelectedProjectId={setSelectedProjectId}
                />
              }
            />
            <Route
              path="/my-projects/:projectName"
              element={
                <SingleProjectPage
                  // api={api}
                  // data={projects}
                  // inbox={inbox}
                  // selectedProjectId={selectedProjectId}
                />
              }
            />

          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;
