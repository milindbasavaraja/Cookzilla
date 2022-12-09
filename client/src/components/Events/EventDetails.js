import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./css/eventDetails.css";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const [eventName, setEventName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCreator, setGroupCreator] = useState("");
  const [eventDate, setEventDate] = useState();
  const [eventDescription, setEventDescription] = useState("");
  const [memberNames, setMemberNames] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const userName = currentUser.userName;
  const [showRSVPButton, setShowRSVPEventButton] = useState(false);
  const [img, setImg] = useState([]);
  const [databaseImageUrls, setDatabaseImageUrls] = useState([]);
  useEffect(() => {
    if (eventDetails.length !== 0) {
      eventDetails.map((event) =>
        setMemberNames((prev) => {
          const prevSet = new Set(prev);
          prevSet.add(event.userName);
          return Array.from(prevSet);
        })
      );
      const eventDetail = eventDetails[0];
      setEventName(eventDetail.eName);
      setEventDescription(eventDetail.eDesc);
      setEventDate(eventDetail.eDate);
      setGroupName(eventDetail.gName);
      setGroupCreator(eventDetail.gCreator);
    }

    setShowRSVPEventButton(!memberNames.includes(userName));
  }, [eventDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/events/get-event/${eventId}`);
        console.log(res.data);
        setEventDetails(res.data);
        const resPic = await axios.get(`/events/pictures/${eventId}`);
        console.log(resPic.data);
        setDatabaseImageUrls(resPic.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onRSVPEventHandler = () => {
    const fetchData = async () => {
      try {
        await axios.post("/events/rsvp/", {
          userName: userName,
          eID: eventId,
          response: "Y",
        });
        setShowRSVPEventButton(false);
        console.log(showRSVPButton);
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const onImageChangeHandler = (event) => {
    setImg(event.target.files);
    console.log(event.target.files);
  };

  const uploadImage = async (images) => {
    console.log("Thw images are: ", images);
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
      console.log(url);
      try {
        await axios.put(url, file, additionalParams);
        console.log(`Image ${file.name} uploaded`);
        let imageURL = s3Url + file.name;
        console.log(`Adding imageURL ${imageURL} to our list`);
        imageURLS = [...imageURLS, imageURL];
      } catch (error) {
        console.log(error);
      }
    }
    console.log(imageURLS);
    return imageURLS;
  };

  const onUploadPhotoHandler = async () => {
    try {
      const imageURLS = await uploadImage(img);
      console.log("The image Urls are: ", imageURLS);
      await axios.post("/events/pictures", {
        eID: eventId,
        imgURLs: imageURLS,
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event-all-details">
      <div className="event-details">
        <div className="event-details-content">
          <h1 className="event-details-title">{eventName}</h1>
          <span className="event-details-title-span-creator">
            Group Name: {groupName}
          </span>
          <span className="event-details-title-span-creator">
            Group Admin: {groupCreator}
          </span>
          <span className="event-details-title-span-creator">
            Event Date: {eventDate}
          </span>
          <div className="event-details-content-description">
            <p className="event-details-content-description-p">
              {eventDescription}
            </p>
          </div>
          {console.log("Boolean ", new Date(eventDate) < new Date())}
          {new Date(eventDate) < new Date() ? (
            <div className="expired-event-content">
              {memberNames.includes(userName) && (
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
                  >
                    Upload Event Photos
                  </label>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onUploadPhotoHandler}
                  >
                    Upload
                  </button>
                </div>
              )}
              {databaseImageUrls.length !== 0 && (
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={databaseImageUrls[0].pictureURL}
                        className="d-block w-100"
                        alt="..."
                        style={{ height: "20rem" }}
                      />
                    </div>
                    {databaseImageUrls.map(
                      (img, index) =>
                        index != 0 && (
                          <div className="carousel-item" key={index}>
                            <img
                              src={img.pictureURL}
                              className="d-block w-100"
                              alt="..."
                              style={{ height: "20rem" }}
                            />
                          </div>
                        )
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
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
                    data-bs-target="#carouselExampleControls"
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
          ) : (
            showRSVPButton && (
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onRSVPEventHandler}
                >
                  RSVP event
                </button>
              </div>
            )
          )}
        </div>
        <div className="event-details-members">
          <h5>Event Members</h5>
          <div className="event-details-members-details">
            <div className="card" style={{ width: "18rem" }}>
              <ul className="list-group list-group-flush">
                {memberNames.map((member, index) => (
                  <li className="list-group-item" key={index}>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
