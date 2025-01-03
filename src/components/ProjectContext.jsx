import React, { createContext, useState, useContext, useEffect } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

export const ProjectProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [projectsmodalVisible, setProjectsModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("charcoal");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    api
      .getProjects()
      .then((fetchedProjects) => {
        setAllProjects(fetchedProjects);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Segregation logic
  const inbox = allProjects.find((project) => project.name === "Inbox");
  const favorites = allProjects.filter((project) => project.isFavorite);
  const projects = allProjects.filter(
    (project) => project.name !== "Inbox"
  );

  const addProject = (newProject) => {
    setAllProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = (projectId) => {
    setAllProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const updateProject = (updatedProject) => {
    setAllProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        api,
        allProjects,
        inbox,
        favorites,
        projects,
        addProject,
        deleteProject,
        updateProject,

        selectedProjectId,
        setSelectedProjectId,

        projectsmodalVisible,
        setProjectsModalVisible,

        selectedColor,
        setSelectedColor,

        hoveredProjectId,
        setHoveredProjectId,

        editingProject,
        setEditingProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
