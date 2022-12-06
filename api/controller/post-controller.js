import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { TransformData } from "../utility/TransformData.js";

export const getAllPosts = (req, res) => {
  const getAllPostsQuery =
    "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp WHERE r.recipeID = rp.recipeID";

  db.query(getAllPostsQuery, [], (error, data) => {
    if (error) return res.status(500).send(error);

    const transformedData = TransformData(data);
    return res.status(200).json(transformedData);
  });
};

export const getPostById = (req, res) => {
  console.log("Getting post by id");
  const getPostDetailsQuery =
    "SELECT `userName`,r.recipeID,`title`,`numServings`,`tagText`,pictureURL FROM Person p, Recipe r,RecipeTag rt,RecipePicture rp WHERE p.userName = r.postedBy AND r.recipeID = rt.recipeID AND r.recipeID = rp.recipeID AND r.recipeID=?";
  console.log("The query is ", getPostDetailsQuery);
  db.query(getPostDetailsQuery, [req.params.id], (error, data) => {
    if (error) {
      console.log("Error happened while querying per ID", error);
      return res.status(500).send(error);
    }

    const transformedData = TransformData(data);

    return res.status(200).json(transformedData[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertRecipieQuery =
      "INSERT INTO Recipe (`title`,`numServings`,`postedBy`) VALUES (?)";

    const values = [req.body.title, 1, userInfo.id];

    db.query(insertRecipieQuery, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).send("Inserted Recipe");
    });

    // console.log("Last RecipeId: ", lastRecipeId);
    //
    // // const insertImages =
    // return res.status(200);

    // let newRecipeId = data.insertId;
    //   console.log("The last recipeId is :", newRecipeId);
    //   console.log("Inserting Images");
  });
};

export const deletePostById = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedIn", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const deletPostQuery = "DELETE FROM posts WHERE `id`= ? AND `uid` = ?";

    db.query(deletPostQuery, [postId, userInfo.id], (error, data) => {
      if (error) return res.status(403).json("You can delete only your posts.");

      return res.json("Post has been deleted");
    });
  });
};

export const updatePostById = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedIn", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const postId = req.params.id;
    const updatePostQuery =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category`=? WHERE `id`=? AND `uid`=?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    db.query(
      updatePostQuery,
      [...values, postId, userInfo.id],
      (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json("Post has been updated");
      }
    );
  });
};

export const getAllTags = (req, res) => {
  const getAllTags = "SELECT DISTINCT tagText FROM RecipeTag";

  db.query(getAllTags, [], (error, data) => {
    if (error) return res.status(500).send(error);
    return res.status(200).json(data);
  });
};

export const getLatestRecipeID = (req, res) => {
  const getLastInsertedRecipieId =
    "SELECT MAX(recipeID) as lastRecipeId FROM Recipe";

  db.query(getLastInsertedRecipieId, [], (error, data) => {
    if (error) return res.status(500).json(error);
    console.log(data);
    return res.status(200).json(data[0]);
  });
};

export const addRecipePhotos = (req, res) => {
  const insertImagesQuery =
    "INSERT INTO RecipePicture (`recipeID`,`pictureURL`) VALUES ?";
  let images = [];
  console.log("The rew images are", req.body.imgs);
  req.body.imgs.map((imageURL) => {
    images.push([req.body.recipeID, imageURL]);
  });

  db.query(insertImagesQuery, [images], (error, data) => {
    if (error) return res.status(500).json(error);
    console.log("Images uploaded");
    return res.status(200).json(data);
  });
};

export const addRecipeTags = (req, res) => {
  const insertImagesQuery =
    "INSERT INTO RecipeTag (`recipeID`,`tagText`) VALUES ?";
  let tags = [];

  req.body.tags.map((tag) => {
    tags.push([req.body.recipeID, tag]);
  });

  db.query(insertImagesQuery, [tags], (error, data) => {
    if (error) return res.status(500).json(error);
    console.log("Tags uploaded");
    return res.status(200).json(data);
  });
};
