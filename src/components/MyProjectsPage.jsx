import React from "react";
import { useState, useEffect } from "react";
import { colorOptions } from "../ColorOptions";
import AddProjectModal from "./AddProjectModal";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

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

const MyProjectsPage = () => {

  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
    projectsModalVisible,
    selectedColor,
    editingProject,
  } = useSelector((state) => state.projects);

  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProjectId, setHoveredProjectId] = useState(null); // State to track the hovered project

  useEffect(() => {
    // Reset selectedProjectId when MyProjectsPage is loaded
    dispatch(setSelectedProjectId(null));
  }, [selectedProjectId]);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  // Filter the projects based on the search query
  const filteredProjects = allProjects
    .filter((project) => project.name.toLowerCase() !== "inbox")
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const resetModalState = () => {
    dispatch(setSelectedColor("charcoal"));
    dispatch(setEditingProject(null));
  };

  const handleEditProject = (project) => {
    dispatch(setEditingProject(project));
    dispatch(toggleProjectsModal());
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 rounded-lg w-[50%] absolute top-20">
          <h1 className="text-2xl font-bold mb-4">My Projects</h1>
          <div className="relative mb-2 ">
            <Input
              type="text"
              placeholder="Search projects"
              className="border rounded px-3 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on Input change
              prefix={<SearchOutlined />}
            />
          </div>

          {/* Add button */}
          <div className="flex justify-end mb-2 ">
            <button
              className="text-[25px] font-normal px-2 rounded-[50%] hover:bg-gray-200"
              onClick={() => {
                dispatch(toggleProjectsModal());
              }}
            >
              +
            </button>
          </div>

          {/* AddProjectModal Component */}
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

          <p className="text-gray-700 font-medium mb-2 ">
            {filteredProjects.length} projects
          </p>
          <hr />
          <ul className="space-y-2">
            {filteredProjects.map((project) => (
              <li
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={(e) => {
                  (e) => e.stopPropagation();
                }}
                className="group p-2 rounded cursor-pointer flex items-center justify-between gap-2 hover:bg-gray-200"
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

                {/* Render MoreOptions dropdown on hover */}
                {hoveredProjectId === project.id && (
                  <MoreOptions
                    project={project}
                    onEdit={handleEditProject} // pass edit handler
                    onDelete={(projectId) => dispatch(deleteProject(projectId))} // pass delete handler
                    updateProject={(proj) => dispatch(updateProject(proj))}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyProjectsPage;
