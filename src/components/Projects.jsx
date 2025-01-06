import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";

import { useProjects } from "./ProjectContext";

const Projects = () => {

  const {
    projects,
    dispatch,
    state: { selectedProjectId, projectsModalVisible, selectedColor, editingProject, hoveredProjectId },
  } = useProjects();

  const [projectsVisible, setProjectsVisible] = useState(true);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const resetModalState = () => {
    dispatch({ type: "SET_SELECTED_COLOR", payload: "charcoal" });
    dispatch({ type: "SET_EDITING_PROJECT", payload: null });
  };

  const handleEditProject = (project) => {
    dispatch({ type: "SET_EDITING_PROJECT", payload: project });
    dispatch({ type: "TOGGLE_PROJECTS_MODAL" });
  };

  const handleProjectAdded = (newProject) => {
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };

  const handleProjectUpdated = (updatedProject) => {
    dispatch({ type: "UPDATE_PROJECT", payload: updatedProject });
  };

  const handleProjectDeleted = (projectId) => {
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  };

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-sm mb-2">
        {/* Use Link for navigation */}
        <Link
          to="/"
          className="text-gray-700 font-semibold hover:text-gray-700"
        >
          My Projects
        </Link>

        <div className="flex gap-2 text-gray-600 items-center">
          <span
            className="text-gray-500 text-[22px] px-2 hover:text-gray-600"
            onClick={() => dispatch({ type: "TOGGLE_PROJECTS_MODAL" })}
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
        open={projectsModalVisible}
        onClose={() => {
          dispatch({ type: "TOGGLE_PROJECTS_MODAL" });
          resetModalState();
        }}
        onProjectAdded={handleProjectAdded}
        onProjectUpdated={handleProjectUpdated}
        editingProject={editingProject} // Pass project to be edited
        selectedColor={selectedColor}
        setSelectedColor={(color) =>
          dispatch({ type: "SET_SELECTED_COLOR", payload: color })
        }
      />

      {/* Projects Section */}
      {projectsVisible && (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onMouseEnter={() => dispatch({type:'SET_HOVERED_PROJECT_ID',payload:project.id})}
              onMouseLeave={() => dispatch({type:'SET_HOVERED_PROJECT_ID',payload:null})}
              className={`group p-2 rounded cursor-pointer flex items-center justify-between ${
                selectedProjectId === project.id
                  ? "bg-orange-200 text-orange-700"
                  : "hover:bg-gray-200"
              }`}
            >
              <div 
                className="w-full"
                onClick={() =>
                  dispatch({ type: "SET_SELECTED_PROJECT_ID", payload: project.id })
                }
                >
                <Link to={`/my-projects/${project.name}`}>
                  <div className="flex items-center">
                    <span
                      className="text-[18px] font-semibold mr-2"
                      style={{ color: getHashtagColor(project) }}
                    >
                      #
                    </span>
                    <span>{project.name}</span>
                  </div>
                </Link>
              </div>

              <div>
                {/* To Display three dots */}
                {hoveredProjectId === project.id && (
                  <div className="group-hover:opacity-100">
                    <MoreOptions
                      project={project}
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
