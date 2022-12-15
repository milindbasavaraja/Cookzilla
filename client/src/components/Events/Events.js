import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/events.css";
import EventList from "./EventList";

const Events = (props) => {
  const [isActiveButton1, setIsActiveButton1] = useState(false);
  const [isActiveButton2, setIsActiveButton2] = useState(false);

  return (
    <div className="events">
      <header className="events-header">
        <h3>Events</h3>
      </header>
      <div className="events-toggle-buttons">
        <button
          className="btn btn-primary"
          data-bs-toggle="collapse"
          href="#multiCollapseExample1"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
          style={{
            backgroundColor: isActiveButton1 ? "red" : "#0d6efd",
          }}
          onClick={() => {
            if (isActiveButton1) {
              setIsActiveButton1(false);
            } else {
              setIsActiveButton1(true);
            }
          }}
        >
          Show Upcoming Events
        </button>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
          style={{
            backgroundColor: isActiveButton2 ? "red" : "#0d6efd",
          }}
          onClick={() => {
            if (isActiveButton2) {
              setIsActiveButton2(false);
            } else {
              setIsActiveButton2(true);
            }
          }}
        >
          Show Completed Events
        </button>
      </div>
      <EventList groupNameCreator={props.groupNameCreator} />
    </div>
  );
};

export default Events;
