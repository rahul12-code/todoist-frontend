import React, { useState, useEffect } from "react";
import { Button, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTasks} from "../features/projects/projectSlice";

const AddTaskModal = ({ open, onClose }) => {

  const dispatch = useDispatch();

  const {
    allProjects,
    selectedProjectId,
    tasks,
  } = useSelector((state) => state.projects);

  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (open) {
      setProjectId(selectedProjectId || (allProjects[0] && allProjects[0].id));
    }
  }, [open]);

  const handleAddTask = async () => {

    const taskData = {
      content: taskContent.trim(),
      description: taskDescription.trim(),
      project_id: projectId,
    };
    console.log(taskData);

    try {
      const response = await fetch(`http://localhost:8081/api/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      console.log(newTask)

      if (selectedProjectId === newTask.project_id) {
        dispatch(setTasks([...tasks, newTask]));
      }

      onClose();
      setTaskContent("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
          value={projectId}
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
          onClick={handleAddTask}
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
