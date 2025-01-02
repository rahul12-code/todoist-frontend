import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { colorOptions } from "../ColorOptions";

import { useProjects } from "./ProjectContext";

const Favorites = (
  // { favorites, onProjectClick, selectedProjectId }
) => {

  const {favorites, selectedProjectId, setSelectedProjectId} = useProjects();
  const [favoritesVisible, setFavoritesVisible] = useState(true);

  const getHashtagColor = (project) => {
    const color = colorOptions.find((option) => option.value === project.color);
    return color ? color.color : "#36454F";
  };

  return (
    <div className="mb-4">
      {favorites.length > 0 && (
        <>
          <div className="flex items-center justify-between cursor-pointer">
            <h2 className="text-gray-700 font-semibold">Favorites</h2>
            <span
              className="text-gray-600 text-[15px] p-1 hover:bg-gray-200 rounded-sm"
              onClick={() => setFavoritesVisible(!favoritesVisible)}
            >
              {favoritesVisible ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
          {favoritesVisible && (
            <ul>
              {favorites.map((project) => (
                <li
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`p-2 rounded cursor-pointer flex items-center gap-2 ${
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
