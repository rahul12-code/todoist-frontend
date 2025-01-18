import React from "react";
import { Menu, Dropdown } from "antd";
import {
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const MoreOptions = ({ project, onEdit, onDelete, updateProject }) => {

  // Delete Project
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      console.log(`Project with ID ${projectId} deleted successfully.`);
      onDelete(projectId);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle favorite project toggle
  const handleFavoriteProject = async (project) => {
    try {
      const updatedProject = {
        ...project,
        is_favorite: project.is_favorite === 1 ? 0 : 1, // Toggle the favorite status
      };
      
      const response = await fetch(`http://localhost:8081/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const message = await response.json();
      console.log('message:', message )

      updateProject(updatedProject);
    } catch (error) {
      console.error("Error Updating project:", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={() => onEdit(project)}>
        <div className="flex gap-3 items-center">
          <EditOutlined />
          <span>Edit</span>
        </div>
      </Menu.Item>
      <Menu.Item key="favorites" onClick={() => handleFavoriteProject(project)}>
        <div className="flex gap-3 items-center">
          <HeartOutlined style={{ fill: "black" }} />
          <span>
            {project.is_favorite === 1 ? "Remove from Favourites" : "Add to Favourite"}
          </span>
        </div>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDeleteProject(project.id)}>
        <div className="flex gap-3 items-center text-red-600">
          <DeleteOutlined />
          <span>Delete</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="topLeft">
      <span
        className="text-gray-500 cursor-pointer hover:text-black text-[18px]"
        onClick={(e) => e.stopPropagation()} // Prevent parent click
      >
        <EllipsisOutlined />
      </span>
    </Dropdown>
  );
};

export default MoreOptions;
