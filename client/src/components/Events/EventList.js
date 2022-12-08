import React, { useEffect, useState } from "react";
import axios, { all } from "axios";

const EventList = (props) => {
  const [allAvailableEvents, setAllAvailableEvents] = useState([]);
  const [allExpiredEvents, setAllExpiredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const availableEvents = allEvents.filter((event) => {
      const date = new Date(event.eDate);
      const todaysDate = new Date();

      return date > todaysDate;
    });

    const expiredEvents = allEvents.filter((event) => {
      const date = new Date(event.eDate);
      const todaysDate = new Date();

      return date < todaysDate;
    });

    setAllAvailableEvents((prev) => availableEvents);
    setAllExpiredEvents((prev) => expiredEvents);
  }, [allEvents]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/events/get-all-events/${props.groupNameCreator}`
        );
        setAllEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="events-toggle-buttons-content">
      <div className="row">
        <div className="collapse multi-collapse" id="multiCollapseExample1">
          <div className="events-toggle-buttons-content-cards">
            {allAvailableEvents.map((availableEvent) => (
              <div
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
                key={availableEvent.eID}
              >
                <div className="card-body">
                  <h5 className="card-title">{availableEvent.eName}</h5>
                  <p
                    className="card-text"
                    style={{
                      height: "15rem",
                      overflow: "scroll",
                      textAlign: "justify",
                    }}
                  >
                    {availableEvent.eDesc}
                  </p>
                  <button className="btn btn-primary">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="collapse multi-collapse" id="multiCollapseExample2">
          <div className="events-toggle-buttons-content-cards">
            {allExpiredEvents.map((expiredEvent) => (
              <div
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
                key={expiredEvent.eID}
              >
                <div className="card-body">
                  <h5 className="card-title">{expiredEvent.eName}</h5>
                  <p
                    className="card-text"
                    style={{
                      height: "15rem",
                      overflow: "scroll",
                      textAlign: "justify",
                    }}
                  >
                    {expiredEvent.eDesc}
                  </p>
                  <button className="btn btn-primary">Explore Event</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
