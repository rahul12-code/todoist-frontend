import React from "react";
import { Menu, Dropdown } from "antd";
import { EditOutlined, HeartOutlined, DeleteOutlined, EllipsisOutlined, } from "@ant-design/icons";

const MoreOptions = ({ project, api, content }) => {

  const handleDeleteProject = async (projectId) => {
    try {
      await api.deleteProject(projectId);
      console.log(`Project with ID ${projectId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  const handleFavoriteProject = async (project) => {
    try {
      const updatedProject = await api.updateProject(project.id, {
        isFavorite: !project.isFavorite,
      });
      console.log(
        `Project with ID ${project.id} updated successfully:`,
        updatedProject
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  
  const menu = (
    <Menu>
      <Menu.Item key="edit">
        <div className="flex gap-3 items-center">
          <EditOutlined />
          <span>Edit</span>
        </div>
      </Menu.Item>
      <Menu.Item key="favorites" onClick={() => handleFavoriteProject(project)}>
        <div className="flex gap-3 items-center">
          <HeartOutlined style={{ fill: "black" }} />
          <span>
            {project.isFavorite ? "Remove from Favourites" : "Add to Favourite"}
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
        className="text-gray-500 cursor-pointer hover:text-gray-700 text-[18px] ml-20"
        onClick={(e) => e.stopPropagation()} // Prevent parent click
      >
        <EllipsisOutlined />
      </span>
    </Dropdown>
  );
};

export default MoreOptions;
