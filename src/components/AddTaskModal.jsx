import React, { useState, useEffect } from "react";
import { Button, Modal, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setTasks} from "../features/projects/projectSlice";
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const AddTaskModal = ({ open, onClose }) => {

  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
    tasks,
  } = useSelector((state) => state.projects);

  const [loading, setLoading] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState(null);

  const projects=allProjects.filter(project=>project.name!=='Inbox')

  useEffect(() => {
    console.log(open)
    if (open) {
      setProjectId(selectedProjectId || (projects[0] && projects[0].id));
    }
  }, [open]);

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
          dispatch(setTasks([...tasks, task]))
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
          value={projectId}
          onChange={handleProjectChange}
          style={{ width: "20%", marginRight: "200px" }}
          placeholder="Select a project"
        >
          {projects.map((project) => (
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
