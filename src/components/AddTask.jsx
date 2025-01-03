import React, { useState, useEffect } from "react";
import { useProjects } from "./ProjectContext";
import { Select } from "antd";

const AddTask = ({ onAddTask, onUpdateTask, onCancel, initialData, taskBeingEdited }) => {
  const { api, allProjects, projects, inbox, selectedProjectId } =
    useProjects();

    console.log(selectedProjectId);

  const [taskContent, setTaskContent] = useState(initialData?.content || "");
  const [taskDescription, setTaskDescription] = useState(initialData?.description || "");

  const [projectId, setProjectId] = useState(
    initialData?.projectId || selectedProjectId || inbox?.id || (projects[0] && projects[0].id) // Default to selectedProjectId, inbox, or first project
  );

  const handleAddorUpdateTask = () => {
    if (!taskContent) {
      alert("Task content cannot be empty!");
      return;
    }

    const taskData = taskBeingEdited
        ? {
              ...initialData,
              content: taskContent,
              description: taskDescription,
              projectId,
          }
        : {
              content: taskContent,
              description: taskDescription,
              projectId,
          };

    taskBeingEdited ? onUpdateTask(taskData) : onAddTask(taskData);
    onCancel(); // Hide the AddTask form
    setTaskContent("");
    setTaskDescription("");
  };

  const handleProjectChange = (value) => {
    setProjectId(value);
    console.log(value, "Project ID changed");
  };

  return (
    <div className="add-task-container w-full p-2 mt-4 border-2 border-gray-300 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Task Content"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        className="w-full text-[16px] p-2 mb-3 rounded-md focus:outline-none focus:ring-0"
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="w-full p-2 mb-3 rounded-md focus:outline-none focus:ring-0"
        rows={1}
      />
      <hr />

      <div className="mt-2 w-full flex justify-between items-center">
        <Select
          key="project-select"
          value={projectId}
          onChange={handleProjectChange}
          style={{ width: "20%" }} 
          placeholder="Select a project"
        >
          {allProjects.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.name}
            </Select.Option>
          ))}
        </Select>

        <div className="flex space-x-2">
          <button
            onClick={onCancel}
            className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddorUpdateTask}
            className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
          >
            {taskBeingEdited===null?'Add Task':'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
