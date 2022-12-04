import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;
  console.log(category);
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

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      
      <div className="home-posts">
        {posts.map((post) => (
          <div className="home-post" key={post.id}>
            <div className="home-post-img">
              <img
                src={`../uploads/${post.img}`}
                className="home-post-image"
                alt=""
              />
            </div>
            <div className="home-content">
              <h1 className="home-post-title">{post.title}</h1>

              <p className="home-post-description">{getText(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
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