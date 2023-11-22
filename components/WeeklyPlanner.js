import React from "react";
import "./WeeklyPlanner.css";
import EventPlanner from "./Events.js";

const WeeklyPlanner = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="wrapper">
      <h1 className="title">Plan Your Week!</h1>
      <div className="grid-container">
        {daysOfWeek.map((day, index) => (
          <div
            className="day-container"
            key={index}
            onClick={() => {
              return <EventPlanner />;
            }}
          >
            <h2 className="day-text">{day}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPlanner;
