import React from "react";
import "./css/myprofile.css";

const MyProfile = () => {
  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <div className="my-profile">
      <div className="my-profile-pic">
        <img
          className="my-profile-pic-image"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Profile Pic Default"
        />
      </div>
      <div className="my-profile-full-name">
        <h1>Milind Basavaraja</h1>
      </div>
      <div className="my-profile-desription">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida
          arcu ac tortor dignissim convallis aenean. Ornare arcu dui vivamus
          arcu felis bibendum ut tristique et. Dolor sit amet consectetur
          adipiscing elit ut aliquam. Rhoncus urna neque viverra justo. Aliquam
          malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.
          Mattis ullamcorper velit sed ullamcorper morbi. Hac habitasse platea
          dictumst quisque. Quisque id diam vel quam elementum pulvinar etiam
          non quam. Platea dictumst vestibulum rhoncus est pellentesque elit
          ullamcorper. Nascetur ridiculus mus mauris vitae. Facilisi nullam
          vehicula ipsum a arcu cursus. Pretium lectus quam id leo in vitae
          turpis massa. Vulputate dignissim suspendisse in est ante. Sapien nec
          sagittis aliquam malesuada. Id aliquet risus feugiat in ante metus
          dictum at tempor. Vitae proin sagittis nisl rhoncus. Eu mi bibendum
          neque egestas congue quisque egestas diam. Felis bibendum ut tristique
          et egestas quis ipsum suspendisse ultrices.
        </p>
      </div>
      <div className="my-profile-posts">
        <ol class="list-group list-group-numbered">
          {posts.map((post) => (
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">{post.title}</div>
                <img
                  className="my-profile-posts-image"
                  src={post.img}
                  alt="My Profile Posts"
                />
              </div>
              <div>
                <button className="my-profile-button"> Read More</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MyProfile;
