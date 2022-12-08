import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const addNewGroup = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertNewGroup =
      "INSERT INTO `Group` (`gName`,`gCreator`,`gDesc`) VALUES (?)";

    console.log(req.body);
    db.query(
      insertNewGroup,
      [[req.body.gName, userInfo.id, req.body.gDesc]],
      (error, data) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json(data);
      }
    );
  });
};

export const joinGroup = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertNewGroup =
      "INSERT INTO GroupMembership (`gName`,`memberName`,`gCreator`) VALUES (?)";

    console.log(req.body);
    db.query(
      insertNewGroup,
      [[req.body.gName, req.body.memberName, userInfo.id]],
      (error, data) => {
        if (error) return res.status(500).json(error);

        return res.status(200).json(data);
      }
    );
  });
};

export const getAllNonJoinedGroups = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const getAllNonJoinedGroupsQuery =
      "SELECT distinct g.gName, g.gCreator,g.gDesc FROM `Group` g, GroupMembership gm WHERE g.gName = gm.gName AND g.gCreator = gm.gCreator AND (g.gName,g.gCreator) NOT IN (SELECT  gm1.gName , gm1.gCreator FROM GroupMembership gm1 WHERE gm1.memberName='milind29')";

    db.query(getAllNonJoinedGroupsQuery, [], (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }

      return res.status(200).json(data);
    });
  });
};

export const getGroupDetailsForAGivenNameAndCretor = (req, res) => {
  const groupDetails = req.params.name.split("--");

  const gName = groupDetails[0];
  const gCreator = groupDetails[1];

  const getGroupDetailsForGnameAndGcreatorQuery =
    "SELECT g.gName, g.gCreator,g.gDesc,gm.memberName FROM `Group` g, GroupMembership gm WHERE g.gName = gm.gName AND g.gCreator = gm.gCreator AND g.gName = ? AND g.gCreator = ?";

  db.query(
    getGroupDetailsForGnameAndGcreatorQuery,
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
