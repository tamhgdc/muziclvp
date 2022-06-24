import React, { createContext, useEffect, useState } from "react";
import getVideoApi from "../apis/video.api";

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [idVideo, setIdVideo] = useState("");
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

  const [recommends, setReCommends] = useState("");
  const [checkMiniVideo, setCheckMiniVideo] = useState(false);
  const [currentTimeShared, setCurrentTimeShared] = useState("");
  const [currentSound, setCurrentSound] = useState("0");
  const [changeMiniVideToVideo, setChangeMiniVideToVideo] = useState(false);

  const getVideo = async () => {
    await getVideoApi(idVideo).then((data) => {
      setDataVideo(data.data.data);
      setLoaderVideo(false);
      setAutoVideo(true);
      setCheckRenderList(false);
      setCurrentTimeShared("0");
    });
  };

  //conver time
  const convertMS = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {
      minutes = "0" + minutes;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds; // Return is HH : MM : SS
    }
  };

  useEffect(() => {
    if (idVideo) {
      setLoaderVideo(true);
      getVideo();
    }
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
    setLoaderVideo,
    recommends,
    setReCommends,
    checkMiniVideo,
    setCheckMiniVideo,
    currentTimeShared,
    setCurrentTimeShared,
    convertMS,
    currentSound,
    setCurrentSound,
    setChangeMiniVideToVideo,
    changeMiniVideToVideo,
  };

  return <VideoContext.Provider value={data}>{children}</VideoContext.Provider>;
};

export default VideoContextProvider;
