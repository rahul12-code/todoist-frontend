import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// import { TodoistApi } from "@doist/todoist-api-typescript";
import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";

import { useProjects } from "./ProjectContext";

// const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const Projects = ({
  // onProjectClick,
  // selectedProjectId,
  // onProjectAdded,
}) => {
  // console.log(content);

  const { 
    projects, addProject, updateProject, deleteProject, 
    selectedProjectId, setSelectedProjectId,
    projectsmodalVisible, setProjectsModalVisible,
    selectedColor, setSelectedColor,
    hoveredProjectId, setHoveredProjectId,
    editingProject, setEditingProject } = useProjects();

  // const [projects, setProjects] = useState(content); // State for projects
  const [projectsVisible, setProjectsVisible] = useState(true);
  // const [projectsmodalVisible, setProjectsModalVisible] = useState(false);
  // const [selectedColor, setSelectedColor] = useState("charcoal");
  // const [hoveredProjectId, setHoveredProjectId] = useState(null);

  // const [editingProject, setEditingProject] = useState(null);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const resetModalState = () => {
    setSelectedColor("charcoal");
    setEditingProject(null);
  };

  // useEffect(() => {
  //   setProjects(content);
  // }, [content]);

  const handleEditProject = (project) => {
    setEditingProject(project); 
    setProjectsModalVisible(true); // Open the modal
  };

  const handleProjectUpdated = (updatedProject) => {
    updateProject(updatedProject); // Use context to update the project
  };

  const handleProjectAdded = (newProject) => {
    addProject(newProject); // Use context to add the project
  };

  const handleProjectDeleted = (projectId) => {
    deleteProject(projectId); // Use context to delete the project
  };

  // const handleProjectDelete = (projectId) => {
  //   deleteProject(projectId);
  // };

  // const handleProjectUpdated = (updatedProject) => {
  //   // Update the project list with the edited project
  //   setProjects((prevProjects) =>
  //     prevProjects.map((proj) =>
  //       proj.id === updatedProject.id ? updatedProject : proj
  //     )
  //   );
  // };

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-sm">
        {/* Use Link for navigation */}
        <Link
          to="/my-projects"
          className="text-gray-700 font-semibold hover:text-gray-700"
        >
          My Projects
        </Link>

        <div className="flex gap-2 text-gray-600 items-center">
          <span
            className="text-gray-500 text-[22px] px-2 hover:text-gray-600"
            onClick={() => setProjectsModalVisible(true)}
          >
            +
          </span>
          <span
            className="text-gray-500 text-[15px] p-1 hover:text-gray-600"
            onClick={() => setProjectsVisible(!projectsVisible)}
          >
            {projectsVisible ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>
      </div>

      <AddProjectModal
        open={projectsmodalVisible}
        onClose={() => {
          setProjectsModalVisible(false);
          resetModalState();
        }}
        // onSave={(newProject) => {
        //   addProject(newProject)
        //   resetModalState();
        // }}
        onProjectAdded={handleProjectAdded}
        onProjectUpdated={handleProjectUpdated}
        // onProjectUpdated={handleProjectUpdated} // Handle project updates
        editingProject={editingProject} // Pass project to be edited
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* Projects Section */}
      {projectsVisible && (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => setSelectedProjectId(project.id)}
              className={`group p-2 rounded cursor-pointer flex items-center justify-between ${
                selectedProjectId === project.id
                  ? "bg-orange-200 text-orange-700"
                  : "hover:bg-gray-200"
              }`}
            >
              <div>
                <span
                  className="text-[18px] font-semibold mr-2"
                  style={{ color: getHashtagColor(project) }}
                >
                  #
                </span>
                <Link
                  to={`/my-projects/${project.name}`}
                  className=" font-medium "
                >
                  {project.name}
                </Link>
              </div>

              <div>
                {/* To Display three dots */}
                {hoveredProjectId === project.id && (
                  <div className="group-hover:opacity-100">
                    <MoreOptions
                      project={project}
                      // api={api}
                      onEdit={handleEditProject} // Pass edit handler
                      onDelete={handleProjectDeleted} // Pass delete handler
                      updateProject={handleProjectUpdated}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default Projects;
