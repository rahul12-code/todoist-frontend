import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";
import { useProjects } from "./ProjectContext";
import { Link } from "react-router-dom";

const Favorites = () => {

  const {
    favorites,
    dispatch,
    state: { selectedProjectId, projectsModalVisible, selectedColor, editingProject},
  } = useProjects();

  const [favoritesVisible, setFavoritesVisible] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

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
    <div className="mb-4">
      {favorites.length > 0 && (
        <>
          <div className="flex items-center justify-between cursor-pointer mb-2">
            <h2 className="text-gray-700 font-semibold">Favorites</h2>
            <span
              className="text-gray-600 text-[15px] p-1 hover:bg-gray-200 rounded-sm"
              onClick={() => setFavoritesVisible(!favoritesVisible)}
            >
              {favoritesVisible ? <FaChevronDown /> : <FaChevronRight />}
            </span>
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

          {/* Favorites Section */}
          {favoritesVisible && (
            <ul>
              {favorites.map((project) => (
                <li
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  
                  className={`group p-2 rounded cursor-pointer flex items-center gap-2 ${
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
        </>
      )}
    </div>
  );
};

export default Favorites;
