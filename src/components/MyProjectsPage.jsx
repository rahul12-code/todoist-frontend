import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import MoreOptions from "./MoreOptions";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { colorOptions } from "../ColorOptions";
import AddProjectModal from "./AddProjectModal";

const MyProjectsPage = ({ projects, api }) => {
  const location = useLocation();
  console.log(useLocation())
//   const { onProjectAdded } = location.state || {};

  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProjectId, setHoveredProjectId] = useState(null); // State to track the hovered project

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedColor, setSelectedColor] = useState("charcoal");

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  // Filter the projects based on the search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 rounded-lg w-[50%] absolute top-20">
          <h1 className="text-2xl font-bold mb-4">My Projects</h1>
          <div className="relative mb-2 ">
            <input
              type="text"
              placeholder="Search projects"
              className="border rounded px-3 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>

          {/* Add button */}
          <div className="flex justify-end mb-2 ">
            <button
              className="text-[25px] font-normal px-2 rounded-lg hover:bg-gray-200"
              onClick={() => setModalVisible(true)}
            >
              +
            </button>
          </div>

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
                className="p-2 rounded cursor-pointer hover:bg-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span
                    className="text-[18px] font-semibold"
                    style={{ color: getHashtagColor(project) }}
                  >
                    #
                  </span>
                  {project.name}
                </div>

                {/* Render MoreOptions dropdown on hover */}
                {hoveredProjectId === project.id && (
                  <MoreOptions
                    project={project}
                    api={api}
                    // setProjects={setProjects}
                    content={projects}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AddProjectModal Component */}
      <AddProjectModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        // onProjectAdded={onProjectAdded}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </>
  );
};

export default MyProjectsPage;
