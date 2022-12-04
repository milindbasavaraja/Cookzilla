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
    console.log(userInfo);
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
    console.log(userInfo);
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

[
  {
    recipeID: 1,
    title: "Bisibelebaath",
    pictureURL: [
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Bisibelebaath/Bisi_Bele_Bath_(Bisibelebath).jpeg",
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Bisibelebaath/bisi-bele-bath-recipe.jpg",
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Bisibelebaath/download.jpeg",
    ],
  },
  {
    recipeID: 2,
    title: "Pulao",
    pictureURL: [
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Pulao/veg-pulao-2.jpeg",
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Pulao/veg-pulao-recipe.jpg",
      "https://my-photos-bucket-smart-photos.s3.amazonaws.com/Pulao/veg-pulao.jpeg",
    ],
  },
];
