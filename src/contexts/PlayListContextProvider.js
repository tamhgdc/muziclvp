import React, { createContext, useEffect, useState } from "react";
import playList from "../apis/playList.api";

export const PlayListContext = createContext();

const PlayListContextProvider = ({ children }) => {
  const [playListData, setPlayListData] = useState("");
  const [idPlayList, setIdPlayList] = useState("");
  const [loaderPlayList, setLoaderPlayList] = useState(true);
  const [checkPlayAudio, setCheckPlayAudio] = useState(false);
  const [checkModalVip, setCheckModalVip] = useState(false);
  const [checkModalStart, setCheckModalStart] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);
  const [checkPlayList, setCheckPlayList] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [checkModalVideoVip, setCheckModalVideoVip] = useState(false);

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
      if (checkPlayList) {
        localStorage.setItem(
          "playList",
          JSON.stringify({
            encodeId: playListData.encodeId,
            url: playListData.link,
            playListSong: d,
          })
        );
      }
    }
  }, [playListData, checkPlayList]);

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
    checkModalStart,
    setCheckModalStart,
    setCheckPlayList,
    setCheckSearch,
    checkSearch,
    setCheckModalVideoVip,
    checkModalVideoVip,
  };

  return (
    <PlayListContext.Provider value={data}>{children}</PlayListContext.Provider>
  );
};

export default PlayListContextProvider;
