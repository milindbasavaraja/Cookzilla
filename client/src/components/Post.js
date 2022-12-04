import React, { useContext, useEffect, useState } from "react";
import "./css/post.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./UI/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/auth-context";

const Post = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigation = useNavigate();
  console.log("The locations is", location);
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(JSON.stringify(res));
        setPost(res.data);
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

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="post-root">
      <div className="post-content-single">
        <img
          className="post-content-single-image"
          src={`../uploads/${post.img}`}
          alt=""
        />
        <div className="post-user-single">
          {userImageDisplay}
          <div className="post-info-single">
            <span className="post-span-user-name">{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="post-edit-single">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <i className="fa-solid fa-pen"></i>
              </Link>
            </div>
          )}
          {currentUser.username === post.username && (
            <div className="post-delete-single">
              <i
                onClick={onDeleteHandler}
                className="fa-solid fa-trash post-edit-image"
              ></i>
            </div>
          )}
        </div>
        <h1 className="post-content-single-h1">{post.title}</h1>
        {getText(post.desc)}
      </div>

      <Menu category={post.category} id={post.id} />
    </div>
  );
};

export default Post;
