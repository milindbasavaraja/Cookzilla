import axios from "axios";
import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const [unitSelected, setUnitSelected] = useState("Select Unit");
  const [availableUnits, setAvailableUnits] = useState([]);

  useEffect(() => {
    props.onSelect(unitSelected);
  }, [unitSelected, props]);

  const onClickItemHandler = (event) => {
    console.log(event.target.innerHTML);
    setUnitSelected(event.target.innerHTML);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/units`);
        setAvailableUnits(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {unitSelected}
      </button>
      <ul className="dropdown-menu">
        {availableUnits.map((unit, index) => {
          return (
            <li key={index}>
              <span className="dropdown-item" onClick={onClickItemHandler}>
                {unit.unitName}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
