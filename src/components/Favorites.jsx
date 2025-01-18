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
  addProject,
  updateProject,
  deleteProject,
} from "../features/projects/projectSlice";

const Favorites = () => {

  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
  } = useSelector((state) => state.projects);

  const [projectsModalVisible, setProjectsModalVisible] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // useEffect(() => {
  //   if (allProjects.length === 0) {
  //     dispatch(fetchProjects());
  //   }
  // }, [dispatch, allProjects]);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const resetModalState = () => {
    setEditingProject(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project)
    setProjectsModalVisible((prev)=>(!prev));
  };

  return (
    <div className="mb-4">
      {allProjects.filter((project) => project.is_favorite).length > 0 && (
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
              setProjectsModalVisible((prev)=>(!prev))
              resetModalState();
            }}
            onProjectAdded={(newProject) => dispatch(addProject(newProject))}
            onProjectUpdated={(updatedProject) =>
              dispatch(updateProject(updatedProject))
            }
            editingProject={editingProject}
          />

          {/* Favorites Section */}
          {favoritesVisible && (
            <ul>
              {allProjects
                .filter((project) => project.is_favorite)
                .map((project) => (
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
                            updateProject={(proj) =>
                              dispatch(updateProject(proj))
                            }
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
