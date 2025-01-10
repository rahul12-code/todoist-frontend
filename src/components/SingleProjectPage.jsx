import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import { EditOutlined } from "@ant-design/icons";
import TickMark from "../assets/tick-mark.svg";
import { TodoistApi } from "@doist/todoist-api-typescript";
const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProjectId,
  setTasks,
} from "../features/projects/projectSlice";

const SingleProjectPage = () => {
  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
    tasks,
  } = useSelector((state) => state.projects);

  const { projectName } = useParams();

  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); // State to control AddTask visibility

  const [taskBeingEdited, setTaskBeingEdited] = useState(null); // Track the task being edited
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const matchedProject = allProjects.find(
      (project) => project.name === projectName
    );
    if (matchedProject) {
      dispatch(setSelectedProjectId(matchedProject.id));
    }
  }, [projectName, tasks]);

  useEffect(() => {
    fetchTasks();
  }, [selectedProjectId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const allTasks = await api.getTasks();
      const filteredTasks = allTasks.filter(
        (task) => task.projectId === selectedProjectId
      );
      dispatch(setTasks(filteredTasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!allProjects.some((project) => project.id === selectedProjectId)) {
    return (
      <div className=" flex justify-center items-center text-2xl relative top-52">
        No project found!
      </div>
    );
  }

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await api.addTask(newTask);
      if (selectedProjectId === newTask.projectId) {
        dispatch(setTasks([...tasks, addedTask]));
      }
      setIsAddTaskVisible(false); // Hide the AddTask component after adding the task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      dispatch(setTasks(tasks.filter((task) => task.id !== taskId)));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await api.updateTask(updatedTask.id, updatedTask);
      dispatch(setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      ));

      setTaskBeingEdited(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-5 font-sans flex flex-col justify-center items-center h-screen w-full">
      <div className="w-[45%] absolute top-20">
        <h1 className="text-2xl font-bold p-3 hover:cursor-pointer">
          {projectName}
        </h1>

        {loading ? (
          <div className="text-center text-[20px]">Loading...</div> // Loading indicator
        ) : (
          <ul className="list-none p-0">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center p-4 px-0 text-[16px] border-b border-gray-300 cursor-pointer group"
              >
                {taskBeingEdited?.id === task.id ? (
                  <AddTask
                    onUpdateTask={handleUpdateTask}
                    onCancel={() => setTaskBeingEdited(null)}
                    initialData={task}
                    taskBeingEdited={taskBeingEdited}
                  />
                ) : (
                  <>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="absolute opacity-0 w-[18px] h-[18px] cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                      <div className="w-[18px] h-[18px] rounded-full border border-gray-400 flex justify-center items-center cursor-pointer">
                        <img
                          src={TickMark}
                          alt="Tick Mark"
                          className="hidden group-hover:block w-[17px] h-[17px]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow ml-3">
                      <p className="text-[16px]">{task.content}</p>
                      <p className="text-[13px] text-gray-600">
                        {task.description}
                      </p>
                    </div>
                    <EditOutlined
                      className="text-gray-600 text-[20px] hover:text-blue-500 hidden group-hover:block"
                      onClick={() => setTaskBeingEdited(task)}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* For Add Task */}
        {isAddTaskVisible ? (
          <AddTask
            onAddTask={handleAddTask}
            onCancel={() => setIsAddTaskVisible(false)} // Handle cancel action
            taskBeingEdited={taskBeingEdited}
          />
        ) : (
          <div
            className="p-4 px-0 group flex items-baseline cursor-pointer text-gray-600 gap-1"
            onClick={() => setIsAddTaskVisible(true)} // Show AddTask component when clicked
          >
            <span className="flex justify-center items-center w-[25px] h-[25px] rounded-full text-[20px] group-hover:bg-[#ab2307] group-hover:text-white">
              +
            </span>
            <span className="font-medium text-[17px] group-hover:text-[#ab2307]">
              Add Task
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProjectPage;
