import React from "react";
import "./Logout.css";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const LogoutPrompt = ({ onLogout, onCancel }) => {
  return (
    <div className="logout-prompt">
      <p>Are you sure you want to Log out?</p>
      <div className="buttons">
        <button onClick={onLogout}>
          <div className="button-content">
            Yes
            <CiCircleCheck className="button-icon" />
          </div>
        </button>
        <button onClick={onCancel}>
          <div className="button-content">
            No
            <CiCircleRemove className="button-icon" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LogoutPrompt;
