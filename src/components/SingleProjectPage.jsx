import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";

const SingleProjectPage = ({ api, data, inbox, selectedProjectId }) => {
  const { projectName } = useParams();
  const [tasks, setTasks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    api
      .getTasks()
      .then((allTasks) => {
        const filteredTasks = allTasks.filter(
          (task) =>
            task.projectId === selectedProjectId && task.projectId !== null
        );
        setTasks(filteredTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [api, selectedProjectId]);

  return (
    <div className="p-5 font-sans flex flex-col justify-center items-center h-screen w-full">
      <div className="w-[50%] absolute top-20">
        <h1 className="text-2xl font-bold mb-4">{projectName || 'Inbox'}</h1>
        <ul className="list-none p-0">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center pb-3 mb-3 border-b-2 "
            >
              <input type="radio" className="mr-3 " disabled />
              {task.content}
            </li>
          ))}
        </ul>
        <div className="mb-4 flex items-center gap-2 cursor-pointer">
          <div
            // onClick={handleAddTaskClick}
            onClick={() => setModalVisible(true)}
            className="flex justify-center items-center w-[24px] h-[24px] rounded-full text-gray-600 text-[20px] hover:bg-[#ab2307] hover:text-white "
          >
            +
          </div>
          <span className="font-medium text-[17px] text-gray-700 hover:text-[#ab2307]">
            Add Task
          </span>
        </div>

        <AddTaskModal
          data={data}
          inbox={inbox}
          open={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          selectedProjectId={selectedProjectId}
        />

      </div>
    </div>
  );
};

export default SingleProjectPage;
