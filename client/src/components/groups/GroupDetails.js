import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Events from "../Events/Events";
import "./css/groupDetails.css";

const GroupDetails = () => {
  const navigation = useNavigate();
  const [groupDetails, setGroupDetails] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupCreator, setGroupCreator] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [memberNames, setMemberNames] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const groupNameCreator = location.pathname.split("/")[2];
  const userName = currentUser.userName;
  const [showJoinGroupButton, setShowJoinGroupButton] = useState(
    !memberNames.includes(userName)
  );

  const [showCheckEventsGroupButton, setShowEventGroupButton] = useState(
    memberNames.includes(userName)
  );

  const [showCreateEventButton, setShowCreateEventGroupButton] = useState(
    currentUser.userName === groupCreator
  );

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const [eventDate, setEventDate] = useState(new Date());
  const [eventId, setEventId] = useState(0);
  useEffect(() => {
    if (groupDetails.length !== 0) {
      const groupDetail = groupDetails[0];
      setGroupName(groupDetail.gName);
      setGroupCreator(groupDetail.gCreator);
      setGroupDescription(groupDetail.gDesc);
    }
    groupDetails.map((group) =>
      setMemberNames((prev) => {
        const prevSet = new Set(prev);
        prevSet.add(group.memberName);
        return Array.from(prevSet);
      })
    );
    setShowJoinGroupButton(!memberNames.includes(userName));
    setShowEventGroupButton(memberNames.includes(userName));
    setShowCreateEventGroupButton(currentUser.userName === groupCreator);
  }, [groupDetails, showJoinGroupButton]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/groups/get-group-details/${groupNameCreator}`
        );

        setGroupDetails(res.data);

        // console.log("Hitting Steps API");
        // const resSteps = await axios.get(`/posts/steps/${postId}`);
        // console.log(resSteps);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [groupNameCreator]);

  const onEventNameChangeHandler = (event) => {
    setEventName(event.target.value);
  };

  const onEventDescriptionChangeHandler = (event) => {
    setEventDescription(event.target.value);
  };

  const onDateChangeHandler = (event) => {
    console.log(event.target.value);
    setEventDate(new Date(event.target.value));
  };

  const onJoinGroupHandler = () => {
    const joinGroup = async () => {
      try {
        await axios.post("/groups/join-group", {
          gName: groupName,
          memberName: currentUser.userName,
          gCreator: groupCreator,
        });
        setShowJoinGroupButton(false);
        setShowEventGroupButton(true);
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    };
    joinGroup();
  };

  const onCreateEventHandler = () => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/events/", {
          gName: groupName,
          gCreator: groupCreator,
          eName: eventName,
          eDescription: eventDescription,
          eDate: eventDate.toISOString().slice(0, 19).replace("T", " "),
        });

        await axios.post("/events/rsvp/", {
          userName: groupCreator,
          eID: res.data.insertId,
          response: "Y",
        });
        navigation(`/events/${res.data.insertId}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <div className="group-all-details">
      <div className="group-details">
        <div className="group-details-content">
          <h1 className="group-details-title">{groupName}</h1>
          <span className="group-details-title-span-creator">
            Created By: {groupCreator}
          </span>
          <div className="group-details-content-description">
            <p className="group-details-content-description-p">
              {groupDescription}
            </p>
          </div>

          {showJoinGroupButton && (
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onJoinGroupHandler}
              >
                Join Group
              </button>
            </div>
          )}
          {showCreateEventButton && (
            /* <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button">
                Create Event
              </button>
            </div>*/

            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop"
              aria-controls="offcanvasTop"
            >
              Create Event
            </button>
          )}

          <div
            className="offcanvas offcanvas-top"
            tabIndex="-1"
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasTopLabel">
                Create New Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="row g-4">
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Event Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputGroupName"
                    placeholder="Enter Event Name"
                    value={eventName}
                    onChange={onEventNameChangeHandler}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a event description here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    value={eventDescription}
                    onChange={onEventDescriptionChangeHandler}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Event Description</label>
                </div>
                <div className="col-4" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="start">Event date:</label>

                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    onChange={onDateChangeHandler}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-primary create-group"
                onClick={onCreateEventHandler}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>

        <div className="group-details-members">
          <h5>Group Members</h5>
          <div className="group-details-members-details">
            <div className="card" style={{ width: "18rem" }}>
              <ul className="list-group list-group-flush">
                {memberNames.map((member, index) => (
                  <li className="list-group-item" key={index}>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      {showCheckEventsGroupButton && (
        <Events groupNameCreator={groupNameCreator} />
      )}
    </div>
  );
};

export default GroupDetails;
