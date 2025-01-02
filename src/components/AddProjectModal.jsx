import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Switch, Select } from "antd";
import { TodoistApi } from "@doist/todoist-api-typescript";
import ColorSelect from "./ColorSelect";


// Todoist API instance
const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const AddProjectModal = ({
  open,
  onClose,
  onProjectAdded,
  selectedColor,
  setSelectedColor,
}) => {
  const [projectName, setProjectName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Reset the modal internal state when it becomes visible
  useEffect(() => {
    if (open) {
      setProjectName("");
      setIsFavorite(false);
    }
  }, [open]);

  const handleAddProject = () => {
    api
      .addProject({
        name: projectName,
        isFavorite: isFavorite,
        color: selectedColor,
      })
      .then((project) => {
        console.log("Project added:", project);
        // Adding color to the project data
        const newProject = { ...project, color: selectedColor };

        onProjectAdded(newProject); // Passing the added project back to parent
        onClose(); // Close the modal after adding
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  };

  return (
    <Modal
      title="Add Project"
      mask={false}
      open={open} 
      onCancel={onClose}
      footer={[
        <Button className="font-semibold" key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button className="bg-orange-400 hover:bg-orange-600 font-semibold" key="submit" type="primary" onClick={handleAddProject}>
          Add Project
        </Button>,
      ]}
    >
      <hr></hr>
      <div className="mt-3">
        <label className="font-semibold">Name</label>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          maxLength={120}
          placeholder="Enter project name"
          className="mt-2"
        />
        <div className="flex flex-row-reverse">{projectName.length}/120</div>
      </div>

      <ColorSelect
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <div className="mt-4">
        <Switch
          checked={isFavorite}
          onChange={(checked) => setIsFavorite(checked)}
        />
        <label className="ml-3">Add to favorites</label>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
