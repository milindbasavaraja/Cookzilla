import React, { useContext, useEffect } from "react";
import "./css/myprofile.css";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";
import GroupLists from "../groups/GroupLists";

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [allJoinedGroups, setAllJoinedGroups] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoRes = await axios.get("/user");
        setUserInfo(userInfoRes.data);
        const userPostsRes = await axios.get("/user/user-posts");
        setUserPosts(userPostsRes.data);

        const res = await axios.get("/groups/all-joined-groups");
        setAllJoinedGroups(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {!currentUser ? (
        <h1 className="my-profile-error">
          You are not Logged In!! Please Log In
        </h1>
      ) : (
        <div className="my-profile">
          <div className="my-profile-pic">
            <img
              className="my-profile-pic-image"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile Pic Default"
            />
          </div>
          <div className="my-profile-full-name">
            <h1>
              {userInfo.fName} {userInfo.lName}
            </h1>
          </div>
          <div className="my-profile-desription">
            <p>{userInfo.profile}</p>
          </div>
          <div className="my-profile-posts">
            <h5>Your Posts</h5>
            <ol>
              {userPosts.map((post) => (
                <li key={post.recipeID}>
                  <div className="my-profile-post">
                    <div className="my-profile-posts-images">
                      {typeof post.pictureURL === "string" ? (
                        <img
                          src={post.pictureURL}
                          className="home-post-image"
                          alt="Posts"
                          key={1}
                        />
                      ) : (
                        post.pictureURL.map((picUrl, index) => (
                          <img
                            src={picUrl}
                            className="home-post-image"
                            alt="Posts"
                            key={index}
                          />
                        ))
                      )}
                    </div>
                  </div>
                  <div className="my-profile-posts-title">
                    <h1>{post?.title}</h1>
                  </div>
                  <div>
                    <Link className="link" to={`/post/${post.recipeID}`}>
                      <button className="my-profile-button"> Read More</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="my-profile-groups-part">
            <h5 className="my-profile-groups-part-h5">Groups You are Part Of!!!!</h5>
            <GroupLists availableGroupsProps={allJoinedGroups} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyProfile;
