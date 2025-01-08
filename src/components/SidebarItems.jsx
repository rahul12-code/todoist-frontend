import React, { useState } from "react";
import Favorites from "./Favorites";
import Projects from "./Projects";
import AddTaskModal from "./AddTaskModal";

const SidebarItems = () => {
  const [tasksmodalVisible, setTasksModalVisible] = useState(false);

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

      {/* Favorites Section */}
      <Favorites />

      {/* Projects Section */}
      <Projects />
    </div>
  );
};

export default SidebarItems;
