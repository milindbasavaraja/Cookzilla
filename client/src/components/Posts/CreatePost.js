import React, { useEffect, useState } from "react";
import "./css/createPost.css";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Steps from "../UI/Steps/Steps";
import Ingredient from "./Ingredient";

const CreatePost = () => {
  const state = useLocation().state;
  const navigation = useNavigate();
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [checkBoxEnabled, setCheckBoxEnabled] = useState(true);
  const [customTags, setCustomTags] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [newIngredients, setNewIngredient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/tags`);

        setTags(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onImageChangeHandler = (event) => {
    setImg(event.target.files);
    console.log(event.target.files);
  };

  const onPublishPostHandler = async (event) => {
    event.preventDefault();
    const imageURLS = await uploadImage(img);
    console.log("The image Urls are: ", imageURLS);
    console.log("Custom tags", customTags);

    const customTagsList = customTags.split(",");
    const allTags = [...checkedTags, ...customTagsList];

    if (
      imageURLS.length === 0 ||
      allTags.length === 0 ||
      title.trim().length === 0 ||
      recipeSteps.length === 0 ||
      ingredientRecipes.length === 0
    ) {
      setInvalidInput(true);
      return;
    }

    try {
      // state
      //   ? await axios.put(`/posts/${state.id}`, {
      //       title,
      //       desc: description,
      //       //img: img ? imageUrl : "",
      //     })
      //   :
      await axios.post(`/posts/`, {
        title,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      let recipeID = await axios.get("/posts/lastest-recipeId");
      console.log("The latest recipID is", recipeID.data.lastRecipeId);
      recipeID = recipeID.data.lastRecipeId;
      await axios.post("/posts/images", {
        recipeID,
        imgs: imageURLS,
      });
      await axios.post("/posts/add-tags", {
        recipeID,
        tags: allTags,
      });
      await axios.post("/posts/add-steps", {
        recipeID,
        steps: recipeSteps,
      });
      if (newIngredients.length !== 0) {
        await axios.post("/ingredients/new-ingredients/", {
          ingredients: newIngredients,
        });
      }

      await axios.post("/posts/ingredients", {
        recipeID,
        ingredients: ingredientRecipes,
      });

      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (images) => {
    console.log("Thw images are: ", images);
    let imageURLS = [];
    const s3Url = "https://my-photos-bucket-smart-photos.s3.amazonaws.com/";
    const apiGatewayUrl =
      "https://wbtozw3u7f.execute-api.us-east-1.amazonaws.com/dev/upload/my-photos-bucket-smart-photos/";
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      let file = images.item(imageIndex);

      let params = {
        filename: file.name,
        key: file.name,
        bucket: "my-photos-bucket",
        "Content-Type": file.type,
        metadataMap: { "x-amz-meta-customLabels": "" },
        "x-amz-meta-customLabels": "",
        "x-api-key": "PZIEXJmVaJ4331Oenfzzg8M6S6nq0zkB1wLHscGt",
      };

      let additionalParams = {
        headers: {
          ...params,
          Accept: "image/*",
          "Content-Type": file.type,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,PUT",
        },
      };

      let url = apiGatewayUrl + file.name;
      console.log(url);
      try {
        await axios.put(url, file, additionalParams);
        console.log(`Image ${file.name} uploaded`);
        let imageURL = s3Url + file.name;
        console.log(`Adding imageURL ${imageURL} to our list`);
        imageURLS = [...imageURLS, imageURL];
      } catch (error) {
        console.log(error);
      }
    }
    console.log(imageURLS);
    return imageURLS;
  };

  const onCheckBoxTagHandler = (event) => {
    let updatedList = [...checkedTags];
    if (event.target.value === "Other" && event.target.checked) {
      setCheckBoxEnabled(false);
    } else if (event.target.value !== "Other") {
      if (event.target.checked) {
        console.log("Adding tag to list ", event.target.value);
        updatedList = [...checkedTags, event.target.value];
      } else {
        console.log("Item Dechecked is: ", event.target.value);
        updatedList.splice(checkedTags.indexOf(event.target.value), 1);
      }
      setCheckedTags(updatedList);
    } else {
      setCheckBoxEnabled(true);
      setCustomTags("");
    }
  };

  const addTagsHandler = (event) => {
    setCustomTags(event.target.value);
  };

  const onAllStepsSubmitted = (stepGoals) => {
    stepGoals.map((step, index) =>
      setRecipeSteps((prevStep) => [
        ...prevStep,
        { text: step.text, id: stepGoals.length - index },
      ])
    );
    // setRecipeSteps((prevSteps) => [...prevSteps, JSON.parse(stepGoals)]);
    // console.log(recipeSteps);
  };

  const onAllIngredientsSubmitted = (ingredients) => {
    ingredients.map((ingredient, index) => {
      if (ingredient.purchaseLink.trim().length !== 0) {
        console.log("Setting purchaselink");
        setNewIngredient((prevStep) => [
          ...prevStep,
          {
            id: index,
            iName: ingredient.text,
            purchaseLink: ingredient.purchaseLink,
          },
        ]);
      }

      setIngredientRecipes((prevStep) => [
        ...prevStep,
        {
          id: index,
          iName: ingredient.text,
          unitName: ingredient.ingredientUnit,
          amount: ingredient.quantity,
        },
      ]);
    });
  };

  return (
    <React.Fragment>
      <div className="create-post">
        <div className="create-post-content">
          <input
            className="create-post-content-input"
            type="text"
            name=""
            value={title}
            placeholder="Title"
            onChange={onTitleChangeHandler}
          />
          <div className="create-post-content-editor-container">
            <Steps
              onStepsSubmitted={onAllStepsSubmitted}
              buttonTitle={"Add Step"}
              submitTitle={"Submit All Steps"}
              labelTitle={"Recipe Steps"}
            />
          </div>
        </div>
        <div className="create-post-menu">
          <div className="create-post-menu-item">
            <Ingredient onStepsSubmitted={onAllIngredientsSubmitted} />
          </div>

          <div className="create-post-menu-item">
            <input
              style={{ display: "none" }}
              type="file"
              id="create-post-photo-file"
              onChange={onImageChangeHandler}
              multiple
            />
            <label
              htmlFor="create-post-photo-file"
              className="create-post-menu-item-input-file"
            >
              Upload Image
            </label>
            <div>
              <h5>Tags</h5>
              {
                <div className="create-post-tags-selection">
                  {checkBoxEnabled &&
                    tags.map((tag, index) => (
                      <div className="create-post-tags" key={index}>
                        <input
                          type="checkbox"
                          name=""
                          value={tag.tagText}
                          onChange={onCheckBoxTagHandler}
                          id={`create-post-tags-checkbox-${index}`}
                          checked={checkedTags.includes(tag.tagText)}
                        />
                        <label
                          htmlFor={`create-post-tags-checkbox-${index}`}
                          className="create-post-tags-checkbox-tag"
                        >
                          {tag.tagText}
                        </label>
                      </div>
                    ))}
                  <input
                    type="checkbox"
                    name=""
                    value="Other"
                    onChange={onCheckBoxTagHandler}
                    id="create-post-tags-checkbox"
                  />
                  <label
                    htmlFor="create-post-tags-checkbox"
                    className="create-post-tags-checkbox-tag"
                  >
                    Other
                  </label>
                  {!checkBoxEnabled && (
                    <input
                      type="text"
                      name="New Tags"
                      placeholder="Enter your tags as comma (',') seperated values "
                      id="create-post-tags-add-text"
                      onChange={addTagsHandler}
                    />
                  )}
                </div>
              }
            </div>

            <div className="create-post-menu-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onPublishPostHandler}
              >
                Post
              </button>
            </div>
          </div>

          {invalidInput && (
            <div className="create-post-error">
              <h1>Please Select Images, Tags and Input Title, Description</h1>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;
