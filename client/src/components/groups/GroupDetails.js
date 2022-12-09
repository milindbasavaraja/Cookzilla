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
  console.log(1);
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
        console.log(2);
        // console.log("Hitting Steps API");
        // const resSteps = await axios.get(`/posts/steps/${postId}`);
        // console.log(resSteps);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onJoinGroupHandler}
              >
                Create Event
              </button>
            </div>
          )}
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
