import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./css/group.css";
import GroupLists from "./GroupLists";

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [availableGroups, setAvailableGroups] = useState([]);

  const onGroupNameChangeHandler = (event) => {
    setGroupName(event.target.value);
  };

  const onGroupDescChangeHandler = (event) => {
    setGroupDesc(event.target.value);
  };
  const onCreateGroupHandler = () => {
    console.log(`The name ${groupName} and desc ${groupDesc}`);
    const fetchData = async () => {
      try {
        await axios.post("/groups/", {
          gName: groupName,
          gDesc: groupDesc,
        });
        await axios.post("/groups/join-group", {
          gName: groupName,
          memberName: currentUser.userName,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setGroupDesc("");
    setGroupName("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/groups/");
        console.log(res.data);
        setAvailableGroups(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="group">
      <div className="group-create-group">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        >
          Create Group
        </button>
        <h1>Groups you are not part of!!</h1>
        <GroupLists availableGroupsProps={availableGroups} />

        <div
          className="offcanvas offcanvas-top"
          tabIndex="-1"
          id="offcanvasTop"
          aria-labelledby="offcanvasTopLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasTopLabel">
              Create New Group
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Group Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputGroupName"
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={onGroupNameChangeHandler}
                />
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a group description here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={groupDesc}
                  onChange={onGroupDescChangeHandler}
                ></textarea>
                <label htmlFor="floatingTextarea2">Group Description</label>
              </div>
            </div>
            <Link to="/groups">
              <button
                type="button"
                className="btn btn-outline-primary create-group"
                onClick={onCreateGroupHandler}
              >
                Create Group
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
