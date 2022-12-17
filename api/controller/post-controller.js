import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { TransformData } from "../utility/TransformData.js";

export const getAllPosts = (req, res) => {
  const queryString = req.query;
  console.log(queryString);
  if ("ingredients" in queryString) {
    //The query string is: { tags: 'Indian' }
    const getIngredientsQuery =
      "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp,RecipeIngredient i WHERE r.recipeID = i.recipeID AND r.recipeID = rp.recipeID AND iName=?";

    db.query(getIngredientsQuery, [queryString.ingredients], (error, data) => {
      if (error) return res.status(500).send(error);

      const transformedData = TransformData(data);
      return res.status(200).json(transformedData);
    });
  } else if ("tags" in queryString) {
    const getTagsQuery =
      "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp, RecipeTag rt WHERE r.recipeID = rp.recipeID AND r.recipeID = rt.recipeID AND tagText=?";

    db.query(getTagsQuery, [queryString.tags], (error, data) => {
      if (error) return res.status(500).send(error);
      console.log(data);
      const transformedData = TransformData(data);
      return res.status(200).json(transformedData);
    });
  } else if ("stars" in queryString) {
    const getTagsQuery =
      "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp, Review rt WHERE r.recipeID = rp.recipeID AND r.recipeID = rt.recipeID AND stars=?";

    db.query(getTagsQuery, [queryString.stars], (error, data) => {
      if (error) return res.status(500).send(error);
      console.log(data);
      const transformedData = TransformData(data);
      return res.status(200).json(transformedData);
    });
  } else {
    const getAllPostsQuery =
      "SELECT r.recipeID,`title`,`pictureURL` FROM Recipe r,RecipePicture rp WHERE r.recipeID = rp.recipeID";

    db.query(getAllPostsQuery, [], (error, data) => {
      if (error) return res.status(500).send(error);

      const transformedData = TransformData(data);
      return res.status(200).json(transformedData);
    });
  }
};

export const getPostById = (req, res) => {
  const getPostDetailsQuery =
    "SELECT `userName`,r.recipeID,`title`,`numServings`,`tagText`,pictureURL FROM Person p, Recipe r,RecipeTag rt,RecipePicture rp WHERE p.userName = r.postedBy AND r.recipeID = rt.recipeID AND r.recipeID = rp.recipeID AND r.recipeID=?";

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
    //console.log(data);
    return res.status(200).json(data[0]);
  });
};

export const addRecipePhotos = (req, res) => {
  const insertImagesQuery =
    "INSERT INTO RecipePicture (`recipeID`,`pictureURL`) VALUES ?";
  let images = [];

  req.body.imgs.map((imageURL) => {
    images.push([req.body.recipeID, imageURL]);
  });

  db.query(insertImagesQuery, [images], (error, data) => {
    if (error) return res.status(500).json(error);
    // console.log("Images uploaded");
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
    //console.log("Tags uploaded");
    return res.status(200).json(data);
  });
};

export const addRecipeSteps = (req, res) => {
  const insertStepsQuery =
    "INSERT INTO Step (`recipeID`,`stepNo`,`sDesc`) VALUES ?";
  let steps = [];

  req.body.steps.map((step) => {
    steps.push([req.body.recipeID, step.id, step.text]);
  });

  db.query(insertStepsQuery, [steps], (error, data) => {
    if (error) return res.status(500).json(error);
    // console.log("Steps uploaded");
    return res.status(200).json(data);
  });
};

export const getAllStepsById = (req, res) => {
  //console.log("Getting steps by id");
  const getPostStepsQuery =
    "SELECT `stepNo`,`sDesc` FROM Step s WHERE s.recipeID = ? ORDER BY `stepNo`";

  db.query(getPostStepsQuery, [req.params.id], (error, data) => {
    if (error) {
      console.log("Error happened while querying per ID", error);
      return res.status(500).send(error);
    }

    // console.log(data);

    return res.status(200).json(data);
  });
};

export const getAllTagsById = (req, res) => {
  //console.log("Getting steps by id");
  const getPostStepsQuery =
    "SELECT `recipeID`,`tagText` FROM RecipeTag WHERE recipeID = ?";

  db.query(getPostStepsQuery, [req.params.id], (error, data) => {
    if (error) {
      console.log("Error happened while querying per ID", error);
      return res.status(500).send(error);
    }

    // console.log(data);

    return res.status(200).json(data);
  });
};

export const getAllIngredientsById = (req, res) => {
  //console.log("Getting steps by id");
  const getPostIngredientsQuery =
    "SELECT `recipeID`,`iName`,`unitName`,`amount` FROM RecipeIngredient WHERE recipeID = ?";

  db.query(getPostIngredientsQuery, [req.params.id], (error, data) => {
    if (error) {
      console.log("Error happened while querying per ID", error);
      return res.status(500).send(error);
    }

    // console.log(data);

    return res.status(200).json(data);
  });
};

export const addRecipeIngredients = (req, res) => {
  const insertStepsQuery =
    "INSERT INTO RecipeIngredient (`recipeID`,`iName`,`unitName`,`amount`) VALUES ?";
  let ingredients = [];

  req.body.ingredients.map((ingredient) => {
    ingredients.push([
      req.body.recipeID,
      ingredient.iName,
      ingredient.unitName,
      ingredient.amount,
    ]);
  });

  db.query(insertStepsQuery, [ingredients], (error, data) => {
    if (error) return res.status(500).json(error);
    console.log("Steps uploaded");
    return res.status(200).json(data);
  });
};

export const addReview = (req, res) => {
  console.log("writing Review for Recipe with id");

  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertReviewQuery =
      "INSERT INTO Review (`userName`,`recipeID`,`revTitle`,`revDesc`,`stars`) VALUES (?)";

    const values = [
      req.body.userName,
      req.body.postID,
      req.body.revTitle,
      req.body.revDesc,
      req.body.stars,
    ];

    db.query(insertReviewQuery, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).send("Inserted Recipe");
    });
  });
};

export const addReviewPhoto = (req, res) => {
  const token = req.cookies.access_token_cookzilla;

  if (!token) return res.status(401).json("Not Authenticated!");
  jwt.verify(token, "userLoggedInCookzilla", (error, userInfo) => {
    if (error) res.status(403).json("Token is not valid");
    const insertRImagesQuery =
      "INSERT INTO ReviewPicture (`userName`,`recipeID`,`pictureURL`) VALUES ?";

    let images = [];

    req.body.imgURLs.map((imageURL) => {
      images.push([req.body.userName, req.body.recipeID, imageURL]);
    });

    db.query(insertRImagesQuery, [images], (error, data) => {
      if (error) return res.status(500).json(error);
      console.log("Images uploaded");
      return res.status(200).json(data);
    });
  });
};

export const getAllReviewsForRecipeID = (req, res) => {
  const recipeId = req.params.id;

  const getReviewsQueryById =
    "SELECT `recipeID`,`revTitle`,`revDesc`,`stars`,`userName` FROM Review WHERE recipeID = ?";

  db.query(getReviewsQueryById, [recipeId], (error, data) => {
    if (error) return res.status(500).send(error);

    return res.status(200).json(data);
  });
};

export const getAllReviewsPhotosForRecipeID = (req, res) => {
  const recipeIdName = req.params.id;

  const recipeID = recipeIdName.split("-")[0];
  const userName = recipeIdName.split("-")[1];

  const getReviewsPhotoQueryById =
    "SELECT `recipeID`,`userName`,`pictureURL` FROM ReviewPicture WHERE recipeID = ? AND userName= ?";

  db.query(getReviewsPhotoQueryById, [recipeID, userName], (error, data) => {
    if (error) return res.status(500).send(error);
    res.status(200).json(data);
  });
};
