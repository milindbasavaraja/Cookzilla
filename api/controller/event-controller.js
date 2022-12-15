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

export const getEventDetails = (req, res) => {
  const getEventDetailsForGnameAndGcreatorQuery =
    "SELECT e.eID,`eName`,`eDesc`,`eDate`,`gName`,`gCreator`,`userName`,`response` FROM Event e, RSVP r WHERE e.eID = r.eID AND e.eID = ? AND r.response='Y'";

  db.query(
    getEventDetailsForGnameAndGcreatorQuery,
    [req.params.id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }
      console.log(res.data);
      return res.status(200).json(data);
    }
  );
};

export const createEventForGroup = (req, res) => {
  console.log(req.body);
  const gName = req.body.gName;
  const gCreator = req.body.gCreator;
  const eName = req.body.eName;
  const eDesc = req.body.eDescription;
  const eDate = req.body.eDate;

  const createNewEventQuery =
    "INSERT INTO Event (`eName`,`eDesc`,`eDate`,`gName`,`gCreator`) VALUES (?)";

  db.query(
    createNewEventQuery,
    [[eName, eDesc, eDate, gName, gCreator]],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }

      return res.status(200).json(data);
    }
  );
};

export const registerForEvent = (req, res) => {
  console.log(req.body);
  const userName = req.body.userName;
  const eID = req.body.eID;
  const response = req.body.response;

  const createNewEventQuery =
    "INSERT INTO RSVP (`userName`,`eID`,`response`) VALUES (?)";

  db.query(createNewEventQuery, [[userName, eID, response]], (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    return res.status(200).json(data);
  });
};

export const uploadPicturesForEvent = (req, res) => {
  console.log(req.body);

  const eID = req.body.eID;
  const pictureURLs = req.body.imgURLs;

  const uuploadNewPhotosEventQuery =
    "INSERT INTO EventPicture (`eID`,`pictureURL`) VALUES ?";

  let picUrls = [];
  pictureURLs.map((pic) => picUrls.push([eID, pic]));

  db.query(uuploadNewPhotosEventQuery, [picUrls], (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    return res.status(200).json(data);
  });
};

export const getEventPhotos = (req, res) => {
  const getEventDetailsForGnameAndGcreatorQuery =
    "SELECT `eID`, `pictureURL` FROM EventPicture WHERE eID = ?";

  db.query(
    getEventDetailsForGnameAndGcreatorQuery,
    [req.params.id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }
      return res.status(200).json(data);
    }
  );
};
