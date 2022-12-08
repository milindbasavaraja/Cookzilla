import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getEventDetailsForAGivenNameAndCretor = (req, res) => {
  const groupDetails = req.params.name.split("--");

  const gName = groupDetails[0];
  const gCreator = groupDetails[1];

  const getEventDetailsForGnameAndGcreatorQuery =
    "SELECT `eID`,`eName`,`eDesc`,`eDate` FROM Event WHERE gName = ? AND gCreator = ?";

  db.query(
    getEventDetailsForGnameAndGcreatorQuery,
    [gName, gCreator],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }

      return res.status(200).json(data);
    }
  );
};
