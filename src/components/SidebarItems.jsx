import React,{useState} from "react";
import Favorites from "./Favorites";
import Projects from "./Projects";
import AddTaskModal from "./AddTaskModal";
import { useProjects } from "./ProjectContext";

const SidebarItems = () => {

  const {inbox, selectedProjectId, setSelectedProjectId} = useProjects();
  const [tasksmodalVisible, setTasksModalVisible] = useState(false);

  return (
    <div className="text-[16px]">

      <div 
        className="mb-4 flex items-center gap-2 cursor-pointer"
        onClick={() => setTasksModalVisible(true)}>
        <div
          className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#ab2307] text-white text-[20px]"
        >
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
            <li
              // onClick={() => setSelectedProjectId(inbox.id)}
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
      <Favorites/>

      {/* Projects Section */}
      <Projects/>
    </div>
  );
};

export default SidebarItems;
