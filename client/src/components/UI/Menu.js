import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarousalImage from "./CarousalImage";
import "./css/menu.css";

const Menu = (props) => {
  const category = props.category;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/reviews/${props.postId}`);
        console.log(res.data);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="menu">
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
