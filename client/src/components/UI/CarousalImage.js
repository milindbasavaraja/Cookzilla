import axios from "axios";
import React, { useEffect, useState } from "react";

const CarousalImage = (props) => {
  const [images, setReviewImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPhotos = await axios.get(
          `/posts/reviews/photos/${props.postId}-${props.userName}`
        );
        console.log(resPhotos.data);
        setReviewImages(resPhotos.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {console.log(images.length, props.userName)}
      {images.length === 0 ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          className="card-img-top"
          alt="..."
        />
      ) : (
        <div
          id={`carouselExampleControls-${props.propKey}`}
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              {console.log(images[0])}
              <img
                src={images[0].pictureURL}
                className="d-block w-100"
                alt="..."
                style={{ width: "10rem", height: "10rem" }}
              />
            </div>
            {images
              .filter((image, index) => index !== 0)
              .map((image, index) => (
                <div
                  className="carousel-item"
                  key={`${props.propKey}-${index}`}
                >
                  <img
                    src={image.pictureURL}
                    className="d-block w-100"
                    alt="..."
                    style={{ width: "10rem", height: "10rem" }}
                  />
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselExampleControls-${props.propKey}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselExampleControls-${props.propKey}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CarousalImage;
