import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Switch, Select } from "antd";
import ColorSelect from "./ColorSelect";
import { TodoistApi } from '@doist/todoist-api-typescript';
const api = new TodoistApi("7a41b607067ae6d30e04543770815e7f7aeee18e");

const AddProjectModal = ({
  open,
  onClose,
  onProjectAdded,
  onProjectUpdated,
  editingProject,
}) => {
  const [projectName, setProjectName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("charcoal")

  // Reset the modal internal state when it becomes visible
  useEffect(() => {
    if (open) {
      if (editingProject) {
        setProjectName(editingProject.name);
        setIsFavorite(editingProject.isFavorite);
        setSelectedColor(editingProject.color);
      } else {
        setProjectName("");
        setIsFavorite(false);
        setSelectedColor("charcoal");
      }
    }
  }, [open, editingProject]);

  const handleAddOrUpdateProject = () => {
    const projectData = {
      name: projectName.trim(),
      isFavorite: isFavorite,
      color: selectedColor,
    };

    if (editingProject) {
      // Update project
      api
        .updateProject(editingProject.id, projectData)
        .then((updatedProject) => {
          onProjectUpdated(updatedProject);
          onClose();
        })
        .catch((error) => console.error("Error updating project:", error));
    } else {
      // Add project
      api
        .addProject(projectData)
        .then((newProject) => {
          console.log("Project added:", newProject);
          onProjectAdded(newProject);
          onClose();
        })
        .catch((error) => console.error("Error adding project:", error));
    }
  };

  const handleCancel=()=>{
    onClose();
    setSelectedColor("charcoal")
  }

  return (
    <Modal
      title={editingProject ? "Edit Project" : "Add Project"}
      mask={false}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button className="font-semibold" key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
        className="bg-orange-400 hover:bg-orange-600 font-semibold"
        key="submit"
        type="primary"
        onClick={handleAddOrUpdateProject}
      >
        {editingProject ? "Update Project" : "Add Project"}
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
