import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/groupDetails.css";

const GroupDetails = () => {
  const [groupDetails, setGroupDetails] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupCreator, setGroupCreator] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [memberNames, setMemberNames] = useState([]);

  const location = useLocation();
  const groupNameCreator = location.pathname.split("/")[2];

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
  }, [groupDetails]);

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

  return (
    <React.Fragment>
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

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button">
              Join Group
            </button>
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
    </React.Fragment>
  );
};

export default GroupDetails;
