import React, { useState, useEffect } from "react";
import { useProjects } from "./ProjectContext";
import { Select } from "antd";

const AddTask = ({ onAddTask, onCancel }) => {

  const { api, allProjects, projects, inbox, selectedProjectId } =
    useProjects();

  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [projectId, setProjectId] = useState(
    selectedProjectId || inbox?.id || (projects[0] && projects[0].id) // Default to selectedProjectId, inbox, or first project
  );

  useEffect(() => {
    if (selectedProjectId) {
      setProjectId(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleAddTask = () => {
    if (!taskContent) {
      alert("Task content cannot be empty!");
      return;
    }

    const newTask = {
      content: taskContent,
      description: taskDescription,
      projectId: selectedProjectId,
    };

    onAddTask(newTask);
    onCancel(); // Hide the AddTask form
    setTaskContent("");
    setTaskDescription("");
  };

  const handleProjectChange = (value) => {
    setProjectId(value);
  };

  return (
    <div className="add-task-container p-2 mt-4 border-2 border-gray-300 rounded-md shadow-sm">
      {/* <h3 className="text-lg font-bold mb-2">Add New Task</h3> */}
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

      <div className="mt-2 w-full flex flex-row-reverse">

        <Select
          key="project-select"
          value={projectId || inbox?.id}
          onChange={handleProjectChange}
          style={{ width: "20%", marginRight: "200px" }}
          placeholder="Select a project"
        >
          {allProjects.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.name}
            </Select.Option>
          ))}
        </Select>

        <div>
          <button
            onClick={onCancel}
            className="bg-orange-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-blue-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
