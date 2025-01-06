import React, { useState, useEffect } from "react";
import { Button, Modal, Select } from "antd";

import { useProjects } from "./ProjectContext";

const AddTaskModal = ({ open, onClose }) => {
  const {
    api,
    projects,
    inbox,
    dispatch,
    state: { tasks, allProjects, selectedProjectId },
  } = useProjects();

  const [loading, setLoading] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [projectId, setProjectId] = useState(null);
  useEffect(() => {
    if (open) {
      setProjectId(selectedProjectId || inbox?.id || (projects[0] && projects[0].id));
    }
  }, [open, selectedProjectId, inbox, projects]);

  const handleOk = () => {
    setLoading(true);
    api
      .addTask({
        content: taskContent.trim(),
        description: taskDescription.trim(),
        projectId: projectId,
      })
      .then((task) => {
        setLoading(false);
        if (selectedProjectId === task.projectId) {
          dispatch({ type: "SET_TASKS", payload: [...tasks, task] });
        }
        onClose();
        setTaskContent("");
        setTaskDescription("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    onClose();
    setTaskContent("");
    setTaskDescription("");
  };

  const handleContentChange = (e) => setTaskContent(e.target.value);

  const handleDescriptionChange = (e) => setTaskDescription(e.target.value);

  const handleProjectChange = (value) => setProjectId(value);

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
      <hr />
      <div className="mb-4 mt-3">
        <input
          type="text"
          value={taskContent}
          onChange={handleContentChange}
          placeholder="Content"
          className="w-full p-1 placeholder:font-bold placeholder:text-gray-500 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Description"
          className="w-full p-1 placeholder:font-bold placeholder:text-gray-500 focus:outline-none focus:ring-0"
        />
      </div>
    </Modal>
  );
};

export default AddTaskModal;
