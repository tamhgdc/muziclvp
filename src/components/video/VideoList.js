import React, { useContext } from "react";
import SingerItem from "../Home/SingerItem";
import { VideoContext } from "../../contexts/VideoContextProvider";
import { useNavigate } from "react-router-dom";

const VideoList = ({ data }) => {
  const { setIdVideo, idVideo } = useContext(VideoContext);
  const navigate = useNavigate();
  const handleVideo = (item) => {
    navigate(item.link);
    setIdVideo(item.encodeId);
    localStorage.setItem("idVideo", JSON.stringify(item.encodeId));
  };

  return (
    <div
      className={`list__item__video ${
        idVideo === data.encodeId && "active__audio"
      }`}
      onClick={() => handleVideo(data)}
    >
      <div className="image__video">
        <img src={data.thumbnail} alt="" />
        <div className="option__video">
          <i
            className="fa-solid fa-play"
            style={{ display: `${idVideo === data.encodeId ? "none" : ""}` }}
          ></i>
          <p
            className="playing"
            style={{ display: `${idVideo !== data.encodeId ? "none" : ""}` }}
          >
            đang phát
          </p>
        </div>
      </div>
      <div className="title__video">
        <div className="name__song">{data.title}</div>
        <div className="singer__rightbar video__singer">
          {data.artists.map((a, index) => {
            return <SingerItem key={index} artist={a} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
