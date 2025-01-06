import React, { useState } from "react";
import Favorites from "./Favorites";
import Projects from "./Projects";
import AddTaskModal from "./AddTaskModal";
import { useProjects } from "./ProjectContext";

const SidebarItems = () => {
  const [tasksmodalVisible, setTasksModalVisible] = useState(false);
  const { inbox } = useProjects();

  return (
    <div className="text-[16px]">
      <div
        className="mb-4 flex items-center gap-2 cursor-pointer"
        onClick={() => setTasksModalVisible(true)}
      >
        <div className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#ab2307] text-white text-[20px]">
          +
        </div>
        <span className="font-medium text-[17px] text-[#ab2307]">Add Task</span>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        open={tasksmodalVisible}
        onClose={() => {
          setTasksModalVisible(false);
        }}
      />

      {/* Inbox */}
      {inbox && (
        <div className="mb-4">
          <ul>
            <li className="font-medium text-[17px] p-2 pl-0 rounded cursor-pointer">
              {inbox.name}
            </li>
          </ul>
        </div>
      )}

      {/* Favorites Section */}
      <Favorites />

      {/* Projects Section */}
      <Projects />
    </div>
  );
};

export default SidebarItems;
