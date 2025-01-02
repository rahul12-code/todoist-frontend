import React, { useState, useEffect } from "react";
// import { TodoistApi } from "@doist/todoist-api-typescript";
import { useProjects } from "./ProjectContext";
import SidebarItems from "./SidebarItems";

// const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const SidebarList = (
  // {selectedProjectId, setSelectedProjectId}
) => {
  // const [inbox, setInbox] = useState(null);
  // const [projects, setProjects] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  
  // const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { inbox, favorites, projects, setSelectedProjectId } = useProjects();

  // useEffect(() => {
  //   api
  //     .getProjects()
  //     .then((projects) => {
  //       const favoriteProjects = projects.filter((project) => project.isFavorite);
  //       const inboxProject = projects.find((project) => project.name === "Inbox");
  //       const allProjects = projects.filter((project) => project.name !== "Inbox");

  //       setFavorites(favoriteProjects);
  //       setProjects(allProjects);
  //       setInbox(inboxProject);
  //     })
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

  // const handleProjectClick = (projectId) => setSelectedProjectId(projectId);

  // const handleProjectAdded = (newProject) => {
  //   if (newProject.isFavorite) {
  //     setFavorites([...favorites, newProject]);
  //   }
  //   setProjects([...projects, newProject]);
  // };

  return (
    <SidebarItems
      favorites={favorites}
      data={projects}
      inbox={inbox}
      // onProjectClick={handleProjectClick}
      // selectedProjectId={selectedProjectId}
      // onProjectAdded={handleProjectAdded}
    />
  );
};

export default SidebarList;