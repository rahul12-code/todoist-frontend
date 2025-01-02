import React from "react";
import { Menu } from "antd";
import { EditOutlined, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import { removeProjectTodo, updateIsFavourite } from "./apiOperations";
const MoreOptionsModel = ({ element }) => {
  console.log("This is the more data", element.isFavorite);
  return (
    <div className="relative left-10">
      <Menu>
        <Menu.Item key="1">
          <div className="flex gap-5">
            <EditOutlined />
            <p>Edit</p>
          </div>
        </Menu.Item>

        <Menu.Item key="2">
          <div
            className="flex gap-5 "
            onClick={() => updateIsFavourite(element.id, element.isFavorite)}
          >
            <HeartOutlined style={{ fill: "black" }} />
            <p>
              {element.isFavorite
                ? "Remove from Favourites"
                : "Add to Favourite"}
            </p>
          </div>
        </Menu.Item>

        <Menu.Item key="3">
          <div
            className="flex gap-5 text-red"
            onClick={() => removeProjectTodo(element.id)}
          >
            <DeleteOutlined />
            <p>Delete</p>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
};

import React, { useState } from "react";
import hash from "../assets/hash.svg";
import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useActionState } from "react";
import MoreOptionsModel from "./MoreOptionsModel";
const IndividualProject = ({ list, selectedProject, setSelectedProject }) => {
  const [moreOptions, setMoreOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  function handleMoreOptions(e) {
    setMoreOptions(true);
    console.log(selectedProject, moreOptions);
  }
  function handleSelectedProject(id) {
    setSelectedProject(id);
    // setMoreOptions(false);
    console.log("the id is : ", id);
  }
  console.log(selectedProject, moreOptions, "this is the data");

  return (
    <div>
      <ul>
        {list.map((element) => (
          // <li key={element.id} className="hover:bg-hover_sidenav cursor-pointer">
          // <span className={`text-${element.color} text-lg`}># </span>
          // <span>{element.name}</span>
          // </li>
          <div
            key={element.id}
            onClick={() => handleSelectedProject(element.id)}
            className={`group cursor-pointer flex justify-between items-baseline
px-2 py-1 rounded-lg ${
              selectedProject === element.id
                ? "bg-select_sidenav"
                : "hover:bg-hover_sidenav"
            }`}
          >
            <div className="flex gap-x-2 items-center">
              <p className={`text-${element.color} text-lg`}># </p>
              <p
                className={`${
                  selectedProject === element.id ? "text-red" : ""
                }`}
              >
                {element.name}
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Dropdown
                trigger={["click"]}
                overlay={<MoreOptionsModel element={element} />}
                placement="rightTop"
              >
                <EllipsisOutlined />
              </Dropdown>
            </div>
          </div>
        ))}
      </ul>
      {/* {isModalVisible?(<MoreOptionsModel isModalVisible={isModalVisible}
handleClose={handleClose}/>):(<></>)} */}
    </div>
  );
};
