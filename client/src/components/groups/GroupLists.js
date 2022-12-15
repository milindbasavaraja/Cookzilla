import React from "react";
import { Link } from "react-router-dom";
import "./css/groupList.css";

const GroupLists = (props) => {
  return (
    <div className="group-list">
      {props.availableGroupsProps.map((agroup, index) => (
        <div className="card" key={index}>
          <div className="card-header">{agroup.gName}</div>
          <div className="card-body">
            <h5 className="card-title">{agroup.gName}</h5>
            <p className="card-text">{agroup.gDesc}</p>
            <p className="card-text">
              <strong>Created By:</strong> {agroup.gCreator}
            </p>
            <Link
              className="link"
              to={`/groups/${agroup.gName}--${agroup.gCreator}`}
            >
              <button className="btn btn-primary">Check Group</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupLists;
