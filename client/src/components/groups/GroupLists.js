import React from "react";
import "./css/groupList.css";

const GroupLists = (props) => {
  console.log(props.availableGroupsProps);
  return (
    <div className="group-list">
      {props.availableGroupsProps.map((agroup, index) => (
        <div className="card" key={index}>
          <div className="card-header">{agroup.gName}</div>
          <div className="card-body">
            <h5 className="card-title">{agroup.gName}</h5>
            <p className="card-text">{agroup.gDesc}</p>
            <p className="card-text">{agroup.gCreator}</p>
            <a href="#/" className="btn btn-primary">
              Check Group
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupLists;
