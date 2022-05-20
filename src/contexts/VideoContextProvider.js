import React, { createContext, useEffect, useState } from "react";
import getVideoApi from "../apis/video.api";

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [idVideo, setIdVideo] = useState(
    JSON.parse(localStorage.getItem("idVideo")) || ""
  );
  const [dataVideo, setDataVideo] = useState("");
  const [loaderVideo, setLoaderVideo] = useState(true);
  const [autoVideo, setAutoVideo] = useState(false);
  const [autoPlayVideo, setAutoPlayVideo] = useState(true);
  const [repeatVideo, setRepeatVideo] = useState(false);
  const [checkZoom, setCheckZoom] = useState(
    JSON.parse(localStorage.getItem("checkZoom")) || false
  );
  const [checkRenderList, setCheckRenderList] = useState(false);
  const [checkChangeVideo, setCheckChangeVideo] = useState(false);
  const getVideo = async () => {
    await getVideoApi(idVideo).then((data) => {
      setDataVideo(data.data.data);
      setLoaderVideo(false);
      setAutoVideo(true);
      setCheckRenderList(false);
    });
  };

  useEffect(() => {
    setLoaderVideo(true);
    getVideo();
  }, [idVideo]);

  const data = {
    idVideo,
    setIdVideo,
    dataVideo,
    loaderVideo,
    autoVideo,
    setAutoVideo,
    setAutoPlayVideo,
    autoPlayVideo,
    setRepeatVideo,
    repeatVideo,
    checkZoom,
    setCheckZoom,
    setCheckRenderList,
    checkRenderList,
    checkChangeVideo,
    setCheckChangeVideo,
  };

  return <VideoContext.Provider value={data}>{children}</VideoContext.Provider>;
};

export default VideoContextProvider;
