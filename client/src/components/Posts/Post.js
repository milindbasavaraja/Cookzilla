import React, { useContext, useEffect, useState } from "react";
import "./css/post.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../UI/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/auth-context";

const Post = () => {
  const [post, setPost] = useState({});
  const [steps, setSteps] = useState([]);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const location = useLocation();
  const navigation = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);

        const resSteps = await axios.get(`/posts/steps/${postId}`);
        setSteps(resSteps.data);

        const resTags = await axios.get(`/posts/tags/${postId}`);
        setTags(resTags.data);
        //console.log(resTags.data);

        const resIngrdeients = await axios.get(`/posts/ingredients/${postId}`);
        setIngredients(resIngrdeients.data);
        //console.log(resIngrdeients.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const { currentUser } = useContext(AuthContext);

  const userImageDisplay = post.userImage ? (
    <img className="user-single-image" src={post.userImage} alt="" />
  ) : (
    <i className="fa-regular fa-user fa-2xl"></i>
  );

  const onDeleteHandler = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-root">
      <div className="post-content-single">
        {post.pictureURL && (
          <div className="post-content-cards">
            {post.pictureURL.map((picUrl, index) => (
              <img
                src={picUrl}
                className="single-post-image"
                alt="Posts"
                key={index}
              />
            ))}
          </div>
        )}

        <div className="post-user-single">
          {userImageDisplay}
          <div className="post-info-single">
            <span className="post-span-user-name">{post?.userName}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {post.userName && currentUser?.userName === post.userName && (
            <div className="post-edit-single">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <i className="fa-solid fa-pen"></i>
              </Link>
            </div>
          )}
          {post.userName && currentUser?.userName === post.userName && (
            <div className="post-delete-single">
              <i
                onClick={onDeleteHandler}
                className="fa-solid fa-trash post-edit-image"
              ></i>
            </div>
          )}

          <h3>Tags: </h3>

          {tags.length !== 0 &&
            tags.map((tag, index) => <h5 key={index}> {tag.tagText} </h5>)}
        </div>
        <h1 className="post-content-single-h1">{post.title}</h1>
        <h4>Recipe Ingredients</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ingredient Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Unit</th>
            </tr>
          </thead>
          {ingredients.length === 0
            ? ""
            : ingredients.map((ingredient, index) => (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{ingredient.iName}</td>
                    <td>{ingredient.amount}</td>
                    <td>{ingredient.unitName}</td>
                  </tr>
                </tbody>
              ))}
        </table>
        <h3 className="post-content-single-h3">Recipe Steps</h3>
        <div className="accordion" id="accordionExample">
          {steps.map((step) => (
            <div className="accordion-item" key={step.stepNo}>
              <h2
                className="accordion-header"
                id={/*id="headingOne"*/ `heading${step.stepNo}`}
              >
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={/*"#collapseOne"*/ `#collapse${step.stepNo}`}
                  aria-expanded="false"
                  aria-controls={`collapse${step.stepNo}`}
                >
                  {/*Accordion Item #1*/ `Step ${step.stepNo}`}
                </button>
              </h2>
              <div
                id={/*"collapseOne"*/ `collapse${step.stepNo}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${step.stepNo}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">{step.sDesc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Menu postId={postId} />
    </div>
  );
};

export default Post;

//;
