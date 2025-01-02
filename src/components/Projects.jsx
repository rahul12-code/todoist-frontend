import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { TodoistApi } from "@doist/todoist-api-typescript";
import AddProjectModal from "./AddProjectModal";
import { colorOptions } from "../ColorOptions";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const Projects = ({
  favorites,
  content,
  onProjectClick,
  selectedProjectId,
  onProjectAdded,
}) => {
  // console.log(content);

  const [projects, setProjects] = useState(content); // State for projects
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("charcoal");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  const resetModalState = () => setSelectedColor("charcoal");

  useEffect(() => {
    setProjects(content); // Sync content with projects state
  }, [content]);

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer">
        {/* Use Link for navigation */}
        <Link
          to="/my-projects"
          state={{ favoritesData:favorites, contentData:content}}
        >
          My Projects
        </Link>

        <div className="flex gap-2 text-gray-600 items-center">
          <span
            className="text-gray-600 text-[22px] px-2 hover:bg-gray-200 rounded-sm"
            onClick={() => setModalVisible(true)}
          >
            +
          </span>
          <span
            className="text-gray-600 text-[15px] p-1 hover:bg-gray-200 rounded-sm"
            onClick={() => setProjectsVisible(!projectsVisible)}
          >
            {projectsVisible ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>
      </div>

      {projectsVisible && (
        <ul>
          {content.map((project) => (
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

              {/* To Display three dots */}
              {hoveredProjectId === project.id && (
                <div className="group-hover:opacity-100">
                  <MoreOptions
                    project={project}
                    api={api}
                    // setProjects={setProjects}
                    content={content}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <AddProjectModal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
          resetModalState();
        }}
        onProjectAdded={(newProject) => {
          setProjects((prevProjects) => [...prevProjects, newProject]);
          onProjectAdded(newProject);
        }}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};

export default Projects;
