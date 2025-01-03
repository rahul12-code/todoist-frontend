import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";
import AddTask from "./AddTask";

import { useProjects } from "./ProjectContext";
import { CheckOutlined } from "@ant-design/icons";
import "../App.css";

const SingleProjectPage = () => {
  const {
    api,
    allProjects,
    updateProject,
    selectedProjectId,
  } = useProjects();

  const { projectName } = useParams();
  const [tasks, setTasks] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(projectName);

  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); // State to control AddTask visibility

  useEffect(() => {
    // Reset editedProjectName when projectName or selectedProjectId changes
    setEditedProjectName(projectName);
  }, [projectName, selectedProjectId]);

  useEffect(() => {
    fetchTasks();
  }, [api, selectedProjectId]);

  const fetchTasks = async () => {
    try {
      const allTasks = await api.getTasks();
      const filteredTasks = allTasks.filter(
        (task) => task.projectId === selectedProjectId
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditBlur = async () => {
    setIsEditing(false);
    if (editedProjectName !== projectName) {
      try {
        // Update project name in the API
        await api.updateProject(selectedProjectId, { name: editedProjectName });

        // Find and update the project in the local state
        const updatedProject = allProjects.find(
          (project) => project.id === selectedProjectId
        );
        if (updatedProject) {
          updateProject({ ...updatedProject, name: editedProjectName });
        }
      } catch (error) {
        console.error("Error updating project name:", error);
      }
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await api.addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setIsAddTaskVisible(false);  // Hide the AddTask component after adding the task

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-5 font-sans flex flex-col justify-center items-center h-screen w-full">
      <div className="w-[45%] absolute top-20">
        {isEditing ? (
          <input
            className="text-2xl font-bold p-3 w-full border border-gray-300 rounded"
            value={editedProjectName}
            onChange={(e) => setEditedProjectName(e.target.value)}
            onBlur={handleEditBlur}
            autoFocus
          />
        ) : (
          <h1
            className="text-2xl font-bold p-3 hover:cursor-pointer hover:border"
            onClick={() => setIsEditing(true)}
          >
            {editedProjectName}
          </h1>
        )}

        <ul className="list-none p-0">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center p-4 text-[16px] border-b border-gray-300 cursor-pointer "
            >
              <input
                type="checkbox"
                className="relative mr-3 w-[18px] h-[18px] rounded-full cursor-pointer appearance-none border border-gray-400"
                onClick={() => handleDeleteTask(task.id)}
              />
              {task.content}
            </li>
          ))}
        </ul>

        {isAddTaskVisible ? (
          <AddTask
            onAddTask={handleAddTask}
            onCancel={() => setIsAddTaskVisible(false)} // Handle cancel action

            selectedProjectId={selectedProjectId}
          />
        ) : (
          <div
            className="p-3 group flex items-baseline cursor-pointer text-gray-600 gap-1"
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
