import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { TransformData } from "../utility/TransformData.js";

export const getUserInfo = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) {
    return res
      .status(401)
      .json("You are not logged in. Please login to see your profile");
  }

  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) {
      res.status(403).json("Token is not valid. Please Logout and Login again");
    }
    const getLoggedInUserInfo = "SELECT * FROM Person WHERE username=?";

    const values = [userInfo.id];

    db.query(getLoggedInUserInfo, [values], (error, data) => {
      if (error) return res.status(500).json(error);

      return res.status(200).json(data[0]);
    });
  });
};

export const getAllPostsForUser = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) {
    return res
      .status(401)
      .json("You are not logged in. Please login to see your profile");
  }

  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) {
      res.status(403).json("Token is not valid. Please Logout and Login again");
    }

    const getAllPostsForAUser =
      "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp WHERE r.recipeID = rp.recipeID AND postedBy = ?";
    const values = [userInfo.id];
    db.query(getAllPostsForAUser, [values], (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }

      const transformedData = TransformData(data);
      return res.json(transformedData);
    });
  });
};
