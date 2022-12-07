import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${category}`);

        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="home">
      <div className="home-posts">
        {posts.map((post) => (
          <div className="home-post" key={post.recipeID}>
            <div className="home-post-img">
              <div className="row-image">
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
            <div className="home-content">
              <h1 className="home-post-title">{post.title}</h1>
              <Link className="link" to={`/post/${post.recipeID}`}>
                <button className="home-post-read-more">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
