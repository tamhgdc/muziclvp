import React, { createContext, useEffect, useState } from "react";
import playList from "../apis/playList.api";

export const PlayListContext = createContext();

const PlayListContextProvider = ({ children }) => {
  const [playListData, setPlayListData] = useState("");
  const [idPlayList, setIdPlayList] = useState(
    JSON.parse(localStorage.getItem("playList"))
      ? JSON.parse(localStorage.getItem("playList")).encodeId
      : ""
  );
  const [loaderPlayList, setLoaderPlayList] = useState(true);
  const [checkPlayAudio, setCheckPlayAudio] = useState(false);
  const [checkModalVip, setCheckModalVip] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);

  const getPlayList = async () => {
    await playList(`${idPlayList}`).then((data) => {
      setPlayListData(data.data.data);
      setLoaderPlayList(false);
    });
  };

  useEffect(() => {
    if (idPlayList) {
      setLoaderPlayList(true);
      getPlayList();
    }
  }, [idPlayList]);

  useEffect(() => {
    let d = [];
    if (playListData) {
      playListData.song.items.forEach((item) => {
        d.push(item);
      });
      localStorage.setItem(
        "playList",
        JSON.stringify({ encodeId: playListData.encodeId, playListSong: d })
      );
    }
  }, [playListData]);

  const data = {
    idPlayList,
    setIdPlayList,
    playListData,
    checkPlayAudio,
    setCheckPlayAudio,
    loaderPlayList,
    checkModalVip,
    setCheckModalVip,
    showRightBar,
    setShowRightBar,
  };

  return (
    <PlayListContext.Provider value={data}>{children}</PlayListContext.Provider>
  );
};

export default PlayListContextProvider;
