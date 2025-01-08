import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  setSelectedProjectId,
  toggleProjectsModal,
  setEditingProject,
  addProject,
  updateProject,
  deleteProject,
  setSelectedColor,
} from "../features/projects/projectSlice";

const Projects = () => {

  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
    projectsModalVisible,
    selectedColor,
    editingProject,
  } = useSelector((state) => state.projects);

  const [projectsVisible, setProjectsVisible] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  useEffect(() => {
    if (allProjects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, allProjects]);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const resetModalState = () => {
    dispatch(setSelectedColor("charcoal"));
    dispatch(setEditingProject(null));
  };

  const handleEditProject = (project) => {
    dispatch(setEditingProject(project))
    dispatch(toggleProjectsModal())
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
            onClick={() => dispatch(toggleProjectsModal())}
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
          dispatch(toggleProjectsModal());
          resetModalState();
        }}
        onProjectAdded={(newProject) => dispatch(addProject(newProject))}
        onProjectUpdated={(updatedProject) =>
          dispatch(updateProject(updatedProject))
        }
        editingProject={editingProject}
        selectedColor={selectedColor}
        setSelectedColor={(color) => dispatch(setSelectedColor(color))}
      />

      {/* Projects Section */}
      {projectsVisible && (
        <ul>
          {allProjects
            .filter((project) => project.name.toLowerCase() !== "inbox") // Exclude project with name 'inbox'
            .map((project) => (
              <li
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group p-2 rounded cursor-pointer flex items-center justify-between ${
                  selectedProjectId === project.id
                    ? "bg-orange-200 text-orange-700"
                    : "hover:bg-gray-200"
                }`}
              >
                <div
                  className="w-full"
                  onClick={() => dispatch(setSelectedProjectId(project.id))}
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
                        onEdit={handleEditProject} // pass edit handler
                        onDelete={(projectId) =>
                          dispatch(deleteProject(projectId))
                        } // pass delete handler
                        updateProject={(proj) => dispatch(updateProject(proj))}
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
