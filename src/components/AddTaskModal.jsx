import React, { useState, useEffect } from "react";
import { Button, Modal, Select } from "antd";
// import { TodoistApi } from "@doist/todoist-api-typescript";

// const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e"); // Replace with your actual Todoist API key

import { useProjects } from "./ProjectContext";

const AddTaskModal = ({ open, onClose}) => {

  const {api, allProjects, projects, inbox, selectedProjectId } = useProjects();

  console.log(selectedProjectId)

  const [loading, setLoading] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  
  const [projectId, setProjectId] = useState(
    selectedProjectId || inbox?.id || (data[0] && data[0].id) // Default to selectedProjectId, inbox, or first project
  );

  useEffect(() => {
    if (selectedProjectId) {
      setProjectId(selectedProjectId);
    }
  }, [selectedProjectId]);
  
  // Combine inbox with other projects
  // const combinedProjects = inbox ? [inbox, ...data] : data;

  const handleOk = () => {
    setLoading(true);

    api
      .addTask({
        content: taskContent,
        description: taskDescription,
        projectId: projectId,
        priority: 4,
        dueString: "tomorrow at 5:00",
      })
      .then((task) => {
        setLoading(false);
        onClose();
        setProjectId(inbox?.id)
        setTaskContent('');
        setTaskDescription('');
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    onClose();
    setProjectId(inbox?.id)
  };

  const handleContentChange = (e) => {
    setTaskContent(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleProjectChange = (value) => {
    setProjectId(value);
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      title="Add Task"
      onCancel={handleCancel}
      mask={false}
      footer={[
        <Select
          key="project-select"
          value={projectId || inbox?.id }
          onChange={handleProjectChange}
          style={{ width: "20%", marginRight: "200px" }}
          placeholder="Select a project"
          
        >
          {allProjects.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.name}
            </Select.Option>
          ))}
        </Select>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
          className="bg-orange-500"
        >
          Add Task
        </Button>,
      ]}
    >
      <div className="mb-4">
        <input
          type="text"
          value={taskContent}
          onChange={handleContentChange}
          placeholder="Content"
          className="w-full p-1 placeholder:font-bold placeholder:text-gray-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Description"
          className="w-full p-1 placeholder:font-bold placeholder:text-gray-500"
        />
      </div>
    </Modal>
  );
};

export default AddTaskModal;
