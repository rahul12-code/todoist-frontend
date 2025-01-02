import React from "react";
import { useState } from "react";
import Favorites from "./Favorites";
import Projects from "./Projects";
import AddTaskModal from "./AddTaskModal";

const SidebarItems = ({
  favorites,
  data,
  inbox,
  onProjectClick,
  selectedProjectId,
  onProjectAdded,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="text-[16px]">
      <div className="mb-4 flex items-center gap-2 cursor-pointer">
        <div
          // onClick={handleAddTaskClick}
          onClick={() => setModalVisible(true)}
          className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#ab2307] text-white text-[20px]"
        >
          +
        </div>
        <span className="font-medium text-[17px] text-[#ab2307]">Add Task</span>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        data={data}
        inbox={inbox}
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        selectedProjectId={selectedProjectId}
      />

      {/* Inbox */}
      {inbox && (
        <div className="mb-4">
          <ul>
            <li
              onClick={() => onProjectClick(inbox.id)}
              className={`font-medium text-[17px] p-2 pl-0 rounded cursor-pointer ${
                selectedProjectId === inbox.id
                  ? "bg-orange-200 text-orange-700"
                  : "hover:bg-gray-200"
              }`}
            >
              {inbox.name}
            </li>
          </ul>
        </div>
      )}

      {/* Favorites Section */}
      <Favorites
        favorites={favorites}
        onProjectClick={onProjectClick}
        selectedProjectId={selectedProjectId}
      />

      {/* Projects Section */}
      <Projects
      favorites={favorites}
        content={data}
        onProjectClick={onProjectClick}
        selectedProjectId={selectedProjectId}
        onProjectAdded={onProjectAdded}
      />
    </div>
  );
};

export default SidebarItems;
