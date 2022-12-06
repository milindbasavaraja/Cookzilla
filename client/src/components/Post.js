import React, { useContext, useEffect, useState } from "react";
import "./css/post.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./UI/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/auth-context";

const Post = () => {
  const [post, setPost] = useState({});
  const [steps, setSteps] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        console.log("Hitting Steps API");
        const resSteps = await axios.get(`/posts/steps/${postId}`);
        console.log(resSteps);
        setSteps(resSteps.data);
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
        </div>
        <h1 className="post-content-single-h1">{post.title}</h1>
        {steps.map((step) => (
          <div key={step.stepNo}>
            {step.stepNo}. {step.sDesc}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

//<Menu category={post.category} id={post.id} />;
