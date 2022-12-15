//import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getAllUnits = (req, res) => {
  const getAllUnitQueries = "SELECT unitName FROM UNIT";

  db.query(getAllUnitQueries, [], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data);
  });
};
