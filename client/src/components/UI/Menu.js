import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import CarousalImage from "./CarousalImage";
import "./css/menu.css";

const Menu = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const [reviewDescription, setReviewDescription] = useState("");
  const [img, setImg] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/reviews/${props.postId}`);
        //console.log(res.data);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onReviewTitleChangeHandler = (event) => {
    setReviewTitle(event.target.value);
  };

  const onRatingChangeHandler = (event) => {
    setReviewRating(event.target.value);
  };

  const onReviewDescriptionChangeHandler = (event) => {
    setReviewDescription(event.target.value);
  };

  const onImageChangeHandler = (event) => {
    setImg(event.target.files);
    //console.log(event.target.files);
  };

  const uploadImage = async (images) => {
    //console.log("Thw images are: ", images);
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
      //console.log(url);
      try {
        await axios.put(url, file, additionalParams);
        // console.log(`Image ${file.name} uploaded`);
        let imageURL = s3Url + file.name;
        //  console.log(`Adding imageURL ${imageURL} to our list`);
        imageURLS = [...imageURLS, imageURL];
      } catch (error) {
        console.log(error);
      }
    }
    //console.log(imageURLS);
    return imageURLS;
  };

  const onUploadPhotoHandler = async () => {
    try {
      const imageURLS = await uploadImage(img);
      //  console.log("The image Urls are: ", imageURLS);
      await axios.post("/posts/reviews/pictures", {
        recipeID: props.postId,
        imgURLs: imageURLS,
        userName: currentUser.userName,
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateReviewHandler = () => {
    const fetchData = async () => {
      try {
        await axios.post("/posts/reviews/", {
          userName: currentUser.userName,
          postID: props.postId,
          revTitle: reviewTitle,
          revDesc: reviewDescription,
          stars: reviewRating,
        });
        setReviewTitle("");
        setReviewDescription("");
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <div className="menu">
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
      >
        Post Review
      </button>
      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasTopLabel">
            Post Review
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row g-4">
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Review Title
              </label>
              <input
                type="text"
                className="form-control"
                id="inputGroupName"
                placeholder="Enter Review Title"
                value={reviewTitle}
                onChange={onReviewTitleChangeHandler}
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Review Description"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                value={reviewDescription}
                onChange={onReviewDescriptionChangeHandler}
              ></textarea>
              <label htmlFor="floatingTextarea2">Review Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="Review Rating Min:1 Max 5"
                min="1"
                max="5"
                value={reviewRating}
                onChange={onRatingChangeHandler}
              />
              <label htmlFor="floatingInput">Review Rating</label>
            </div>
            <div>
              <input
                style={{ display: "none" }}
                type="file"
                id="create-post-photo-file"
                onChange={onImageChangeHandler}
                multiple
              />
              <label
                htmlFor="create-post-photo-file"
                className="btn btn-primary"
                style={{ marginBottom: "1rem" }}
              >
                Upload Review Photos
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onUploadPhotoHandler}
                style={{ marginLeft: "1rem", marginBottom: "1rem" }}
              >
                Upload
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-primary create-group"
            onClick={onCreateReviewHandler}
          >
            Post Review
          </button>
        </div>
      </div>
      {reviews.length === 0 ? (
        <h1>No Reviews Found</h1>
      ) : (
        <div>
          <h1 className="menu-h1">Reviews</h1>
          {reviews.map((review, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <CarousalImage
                  images={""}
                  propKey={index}
                  userName={review.userName}
                  postId={review.recipeID}
                />
                <h5 className="card-title" style={{ marginTop: "1rem" }}>
                  {review.revTitle}
                </h5>
                <p className="card-text">{review.revDesc}</p>
                <p
                  className="card-text"
                  style={{ fontWeight: "bold", marginTop: "1rem" }}
                >
                  Ratings: {review.stars}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Review By: {review.userName}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
// {posts
//   .filter((post) => post.id !== props.id)
//   .map((post) => (
//     <div className="menu-post" key={post.id}>
//       <img
//         className="menu-post-img"
//         src={`../uploads/${post.img}`}
//         alt=""
//       />
//       <h2 className="menu-h2">{post.title}</h2>
//       <Link className="link" to={`/post/${post.id}`}>
//         <button className="menu-button"> Read More</button>
//       </Link>
//     </div>
//   ))}

{
}
