import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useProjects } from "../context/ProjectContext"; // Import the useProjects hook
import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";

const Projects = ({ content, onProjectClick, selectedProjectId }) => {
  const { projects, addProject, updateProject, deleteProject } = useProjects(); // Use context
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("charcoal");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const handleEditProject = (project) => {
    setEditingProject(project); 
    setSelectedColor(project.color); 
    setModalVisible(true); 
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

  useEffect(() => {
    setProjects(content); // Ensure projects are updated with new context values
  }, [content]);

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-sm">
        <Link
          to="/my-projects"
          className="text-gray-700 font-semibold hover:text-gray-700"
        >
          My Projects
        </Link>
        <div className="flex gap-2 text-gray-600 items-center">
          <span
            className="text-gray-500 text-[22px] px-2 hover:text-gray-600"
            onClick={() => setModalVisible(true)}
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

      {projectsVisible && (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => onProjectClick(project.id)}
              className={`group p-2 rounded cursor-pointer flex items-center gap-2 ${
                selectedProjectId === project.id
                  ? "bg-orange-200 text-orange-700"
                  : "hover:bg-gray-200"
              }`}
            >
              <span
                className="text-[18px] font-semibold"
                style={{ color: getHashtagColor(project) }}
              >
                #
              </span>
              {project.name}

              {hoveredProjectId === project.id && (
                <div className="group-hover:opacity-100">
                  <MoreOptions
                    project={project}
                    onEdit={handleEditProject}
                    onDelete={handleProjectDeleted} // Pass delete handler
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <AddProjectModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onProjectAdded={handleProjectAdded}
        onProjectUpdated={handleProjectUpdated}
        editingProject={editingProject}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default Projects;
