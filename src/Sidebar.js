import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CiHome,
  CiCalendar,
  CiMemoPad,
  CiLogout,
  CiMenuBurger,
  CiViewList,
} from "react-icons/ci";
import "./Sidebar.css";
import Calendar from "./components/Calendar";
import LogoutPrompt from "./components/Logout";
import Dashboard from "./components/Dashboard.js";
import ToDo from "./components/todo.js";
import EventPlanner from "./components/EventPlanner.js";

const Sidebar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarWidth, setSidebarWidth] = useState(80);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 80 ? 300 : 80));
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  const [showPrompt, setShowPrompt] = useState(false);

  const handleLogout = () => {
    navigate("/");
    setShowPrompt(false);
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  const pageComponents = {
    Dashboard: <Dashboard />,
    Calendar: <Calendar />,
    Events: <EventPlanner />,
    "To-Do": <ToDo />,
  };

  const menuList = [
    {
      text: "Dashboard",
      icon: CiHome,
    },
    {
      text: "Calendar",
      icon: CiCalendar,
    },
    {
      text: "Events",
      icon: CiViewList,
    },
    {
      text: "To-Do",
      icon: CiMemoPad,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
        <ul>
          <li onClick={toggleSidebar}>
            <CiMenuBurger />
            {sidebarWidth === 300 ? (
              <div className="Menu-text">Menu</div>
            ) : null}
          </li>

          {menuList.map((item, index) => (
            <li
              key={index}
              className={`Menulist ${activePage === item.text ? "active" : ""}`}
              onClick={() => handleMenuClick(item.text)}
            >
              <div className="icon">{React.createElement(item.icon)}</div>
              {sidebarWidth === 300 ? (
                <div className="text">{item.text}</div>
              ) : null}
            </li>
          ))}

          <li onClick={() => setShowPrompt(true)}>
            <div className="icon">{React.createElement(CiLogout)}</div>
            {sidebarWidth === 300 ? <div>Log Out</div> : null}
          </li>
        </ul>
      </div>

      <div className="content">{pageComponents[activePage]}</div>
      {showPrompt && (
        <LogoutPrompt onLogout={handleLogout} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Sidebar;
