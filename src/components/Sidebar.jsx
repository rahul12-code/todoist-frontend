import React, { useState } from "react";
import { Drawer } from "antd";
import SidebarIcon from "../assets/sidebar19.svg";
import "../App.css";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); //Intially open
  const [drawerWidth, setDrawerWidth] = useState(270);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="relative">
      
      {/* Sidebar Icon */}
      <img
        src={SidebarIcon}
        onClick={toggleDrawer}
        className="cursor-pointer"
        style={{
          // position: "absolute",
          position: "fixed",
          top: "10px",
          left: isDrawerOpen ? `${drawerWidth - 50}px` : "10px",
          zIndex: 3000,
          width: "30px",
          transition: "left 0.3s ease", // Smooth transition for position change
        }}
      />

      {/* Ant Design Drawer */}
      <Drawer
        placement="left"
        closable={false}
        mask={false}
        onClose={toggleDrawer}
        open={isDrawerOpen}
        destroyOnClose={true} 
        width={drawerWidth}
        style={{
          backgroundColor: "#f3f4f6", // Set background color
        }}
      >
        <div className="mt-10">
          <SidebarItems/>
        </div>

      </Drawer>
    </div>
  );
};

export default Sidebar;
