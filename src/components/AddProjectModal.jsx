import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Switch, Select, message } from "antd";
import ColorSelect from "./ColorSelect";

const AddProjectModal = ({
  open,
  onClose,
  onProjectAdded,
  onProjectUpdated,
  editingProject,
}) => {
  const [projectName, setProjectName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("charcoal");

  // Reset the modal internal state when it becomes visible
  useEffect(() => {
    if (open) {
      if (editingProject) {
        setProjectName(editingProject.name);
        setIsFavorite(editingProject.is_favorite === 1);
        setSelectedColor(editingProject.color);
      } else {
        setProjectName("");
        setIsFavorite(false);
        setSelectedColor("charcoal");
      }
    }
  }, [open, editingProject]);

  // Async function to handle add or update project
  const handleAddOrUpdateProject = async () => {
    const projectData = {
      id: editingProject?.id,
      name: projectName.trim(),
      is_favorite: isFavorite ? 1 : 0,
      color: selectedColor,
    };

    try {
      let response;
      if (editingProject) {
        // Update project using PUT
        response = await fetch(`http://localhost:8081/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });
      } else {
        // Add new project using POST
        const token = localStorage.getItem("token");
        response = await fetch("http://localhost:8081/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(projectData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save project");
      }
      
      if (editingProject) {
        console.log(projectData);
        onProjectUpdated(projectData); 
      } else {
        const message = await response.json(); // for retrieving ID
        message.is_favorite = message.is_favorite ? 1 : 0;
        console.log(message);
        onProjectAdded(message); 
      }

      onClose(); // Close the modal after success
    } catch (error) {
      console.error("Error handling project:", error);
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
