import React, { useContext } from "react";
import "./miniatureVideo.css";
import TagVideo from "./TagVideo";
import { VideoContext } from "../../contexts/VideoContextProvider";
import TagVideoLoader from "./TageVideoLoader";

const MiniatureVideo = () => {
  const { loaderVideo, dataVideo } = useContext(VideoContext);

  return (
    <div className="miniature__video">
      <div className="miniature__video__tag">
        {loaderVideo ? <TagVideoLoader /> : <TagVideo />}
      </div>
      <div className="miniature__video__title">
        {loaderVideo ? "đang chuyển bài" : dataVideo.title}
      </div>
    </div>
  );
};

export default MiniatureVideo;
