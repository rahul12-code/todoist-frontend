import React, { useState } from "react";
import { Drawer } from "antd";
import SidebarIcon from "../assets/sidebar19.svg";
import SidebarList from "./SidebarList";
import "../App.css";
import SidebarItems from "./SidebarItems";

const Sidebar = (
  // {selectedProjectId, setSelectedProjectId}
) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); //Intially open
  const [drawerWidth, setDrawerWidth] = useState(270);
  const [isResizing, setIsResizing] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleMouseDown = () => setIsResizing(true);

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = Math.min(Math.max(e.clientX, 270), 400);
      setDrawerWidth(newWidth);
    }
  };

  const handleMouseUp = () => setIsResizing(false);

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="relative">
      {/* Sidebar Icon */}
      <img
        src={SidebarIcon}
        onClick={toggleDrawer}
        className="cursor-pointer"
        style={{
          position: "absolute",
          top: "10px",
          left: isDrawerOpen ? `${drawerWidth - 40}px` : "10px",
          zIndex: 3000,
          width: "30px",
          transition: "left 0.3s ease", // Smooth transition for position change
        }}
      />

      {/* Ant Design Drawer */}
      <Drawer
        // title="Projects"
        placement="left"
        closable={false}
        mask={false}
        onClose={toggleDrawer}
        open={isDrawerOpen}
        destroyOnClose={true} // Destroy content when closed
        width={drawerWidth}
        style={{
          backgroundColor: "#fcfaf8", // Set background color
          transition: "none", // Remove sliding animation
        }}
      >
        <div className="mt-10">
          <SidebarItems 
            // selectedProjectId={selectedProjectId} 
            // setSelectedProjectId={setSelectedProjectId}
          />
        </div>

        {/* Resizing Handle */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "8px",
            height: "100%",
            cursor: "col-resize",
            zIndex: 1000,
            boxShadow: "none",
          }}
        ></div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
